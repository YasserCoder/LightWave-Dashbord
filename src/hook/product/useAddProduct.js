import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewProduct } from "../../services/apiProduct";

export function useAddProduct() {
    const queryClient = useQueryClient();

    const { mutate: createProduct, isLoading: isCreating } = useMutation({
        mutationFn: addNewProduct,
        onSuccess: () => {
            toast.success("New Product successfully created");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createProduct };
}
