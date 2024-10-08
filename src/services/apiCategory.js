import supabase from "./supabase";
import { getToday } from "../utils/helpers";

export async function getMostSoldCategory(date) {
    let { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("*");

    if (categoryError) {
        console.error(categoryError.message);
        throw new Error("Products could not be loaded");
    }

    const { data: orderItems, error } = await supabase
        .from("orderItems")
        .select(
            "created_at,quantity,order:orderId!inner(status),product:productId (category:categoryId (id,parentId))"
        )
        .eq("order.status", "delivred")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }
    const aggregatedData = {};

    for (const item of orderItems) {
        if (item.product.category !== null) {
            const parentCategory =
                item.product.category.parentId === null
                    ? item.product.category.name
                    : findParent(categoryData, item.product.category.parentId);

            if (aggregatedData[parentCategory]) {
                aggregatedData[parentCategory] += item.quantity;
            } else {
                aggregatedData[parentCategory] = item.quantity;
            }
        }
    }

    const result = Object.entries(aggregatedData).map(
        ([category, quantity]) => ({
            category,
            quantity,
        })
    );

    return result;
}
function findParent(data, idParent) {
    let parentCategoryId = idParent;
    let childId = 0;
    while (parentCategoryId !== null) {
        childId = parentCategoryId;
        parentCategoryId = data.find(
            (item) => item.id === parentCategoryId
        )?.parentId;
    }
    let parentName = data.find((item) => item.id === childId)?.name;
    return parentName;
}

export async function getCategories() {
    const data = await selectCategories();
    function findChildren(idParent) {
        let isEmpty = true;
        let result = {};

        for (const category of data) {
            if (category.parentId === idParent) {
                isEmpty = false;
                result[category.name] = findChildren(category.id);
            }
        }

        return isEmpty ? "" : result;
    }

    let result = {};

    for (const category of data) {
        if (category.parentId === null) {
            result[category.name] = findChildren(category.id);
        }
    }

    return result;
}

export async function selectCategories() {
    let { data, error } = await supabase
        .from("category")
        .select("*")
        .order("id");

    if (error) {
        console.error(error);
        throw new Error("Categories could not be loaded");
    }
    return data;
}

export async function addCategory(catData) {
    const { data, error } = await supabase
        .from("category")
        .insert(catData)
        .select()
        .single();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    return data;
}

export async function deleteCategory(name) {
    const { error } = await supabase.from("category").delete().eq("name", name);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
