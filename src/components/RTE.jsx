import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-2 text-sm font-medium text-[#0A0908]">
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey="6pofzvrncqa1wwy9bms3r0f1wr53jnjn1pee5silybdsutlh"
                        value={value} // controlled value
                        init={{
                            height: 400,
                            menubar: true,
                            branding: false,
                            skin: "oxide",          // Light modern look
                            content_css: "default", // Default styling for readability
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "wordcount",
                            ],
                            toolbar: `
                undo redo | blocks | 
                bold italic underline forecolor | 
                alignleft aligncenter alignright alignjustify | 
                bullist numlist outdent indent |
                link image media | removeformat preview fullscreen`,
                            content_style: `
                body {
                  font-family: 'Inter', sans-serif;
                  font-size: 14px;
                  line-height: 1.6;
                  color: #0A0908;
                }
              `,
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}
