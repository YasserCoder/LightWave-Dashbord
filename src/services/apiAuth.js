import supabase, { supabaseUrl } from "./supabase";

export async function signup({
    email,
    password,
    name,
    phone,
    authority,
    avatar,
    country,
    city,
    adress,
    postCode,
}) {
    let imgUrl = "";
    if (avatar) {
        const imgName = `${Math.random()}-${avatar.name}`.replaceAll("/", "");
        imgUrl = `${supabaseUrl}/storage/v1/object/public/userAvatars/${imgName}`;

        const { error: storageError } = await supabase.storage
            .from("userAvatars")
            .upload(imgName, avatar);

        if (storageError) {
            console.error(storageError);
            throw new Error("Avatar could not be uploaded");
        }
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                phone,
                email,
                pwd: password,
                country,
                city,
                postCode,
                adress,
                avatar: imgUrl === "" ? undefined : imgUrl,
            },
        },
    });

    if (error) throw new Error(error.message);

    const { error: registerError } = await supabase.from("profile").insert([
        {
            id: data.user.id,
            email,
            name,
            phone,
            authority,
            country,
            city,
            postCode,
            adress,
            avatar: imgUrl === "" ? undefined : imgUrl,
        },
    ]);

    if (registerError) {
        console.log(registerError.message);
        throw new Error(registerError.message);
    }

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("authority")
        .eq("id", data?.user?.id)
        .single();
    if (profileError) throw new Error(profileError.message);

    if (profile?.authority === "admin") return data;
    return null;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateUser({
    email,
    newPassword,
    name,
    phone,
    country,
    city,
    postCode,
    adress,
    avatar,
}) {
    let imgUrl = "";
    if (avatar && typeof avatar === "object") {
        const imgName = `${Math.random()}-${avatar.name}`.replaceAll("/", "");
        imgUrl = `${supabaseUrl}/storage/v1/object/public/userAvatars/${imgName}`;

        const { error: storageError } = await supabase.storage
            .from("userAvatars")
            .upload(imgName, avatar);

        if (storageError) {
            console.error(storageError);
            throw new Error("Avatar could not be uploaded");
        }
    }
    const { data, error } = await supabase.auth.updateUser({
        email,
        password: newPassword,
        data: {
            name,
            phone,
            country,
            city,
            postCode,
            adress,
            email,
            pwd: newPassword,
            avatar: imgUrl === "" ? avatar : imgUrl,
        },
    });
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    const { error: profileError } = await supabase
        .from("profile")
        .update({
            name,
            phone,
            country,
            city,
            postCode,
            adress,
            email,
            avatar: imgUrl === "" ? avatar : imgUrl,
        })
        .eq("id", data.user.id);

    if (profileError) {
        console.log(profileError.message);
        throw new Error(profileError.message);
    }
    return data;
}
