import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Slug generator
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        if (!userData) {
            alert("You must be logged in to submit posts.");
            return;
        }

        try {
            let file = null;
            if (data.image?.[0]) file = await appwriteService.uploadFile(data.image[0]);

            if (post) {
                if (file && post.featuredImage) await appwriteService.deleteFile(post.featuredImage);

                const updatedPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
            } else {
                if (!file) {
                    alert("Featured image is required");
                    return;
                }

                const createdPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });

                if (createdPost) navigate(`/post/${createdPost.$id}`);
            }
        } catch (err) {
            console.error("PostForm submit error:", err);
            alert("Something went wrong. Try again!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md"
        >
            {/* LEFT: Content */}
            <div className="w-full lg:w-2/3 space-y-4">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="auto-generated or edit manually"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* RIGHT: Sidebar */}
            <div className="w-full lg:w-1/3 space-y-4 flex flex-col">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("image", { required: !post })}
                />

                {post?.featuredImage ? (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg shadow-sm border border-gray-300 mt-2"
                        />
                    </div>
                ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mt-2">
                        No Image
                    </div>
                )}

                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    className={`mt-auto w-full py-2 rounded-lg shadow-md text-white ${post ? "bg-green-500 hover:bg-green-600" : "bg-black hover:bg-gray-900"}`}
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
