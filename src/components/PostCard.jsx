import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "/placeholder.png"; // fallback image

  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-48">
          <img
            src={imageUrl}
            alt={title || "Post"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-[#0A0908] hover:text-[#3B82F6] transition-colors duration-200">
            {title || "Untitled Post"}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
