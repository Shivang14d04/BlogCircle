# MegaBlog Configuration Notes

## Environment Configuration

### Overview

This project uses Appwrite as the backend service for the blog application. The configuration is managed through environment variables and a configuration file.

### Files Structure

- `.env` - Production/development environment variables (not committed to version control)
- `.env.sample` - Template file showing required environment variables
- `src/conf/conf.js` - Configuration object that imports environment variables

---

## .env File

**Purpose**: Contains actual configuration values for the application

**Location**: `/MegaBlog/.env`

**Variables**:

```bash
VITE_APPWRITE_URL="https://fra.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID ="68cd12e50022787c1326"
VITE_APPWRITE_DATABASE_ID ="68cd13d0001aafafbebd"
VITE_APPWRITE_COLLECTION_ID ="articles"
VITE_APPWRITE_BUCKET_ID ="68cd27f20006886d763d"
```

**Notes**:

- Uses `VITE_` prefix for Vite environment variables (accessible in frontend)
- Contains production Appwrite endpoint (Frankfurt region)
- Includes actual project IDs and resource identifiers
- Should be added to `.gitignore` to prevent exposure of sensitive data

---

## .env.sample File

**Purpose**: Template file for environment variables setup

**Location**: `/MegaBlog/.env.sample`

**Content**:

```bash
VITE_APPWRITE_URL="test environment"
VITE_APPWRITE_PROJECT_ID =""
VITE_APPWRITE_DATABASE_ID =""
VITE_APPWRITE_COLLECTION_ID =""
VITE_APPWRITE_BUCKET_ID =""
```

**Notes**:

- Provides template for required environment variables
- Should be committed to version control
- Developers copy this file to create their own `.env` file
- Contains placeholder values to indicate required format

---

## conf.js File

**Purpose**: Configuration object that centralizes environment variable access

**Location**: `/MegaBlog/src/conf/conf.js`

**Content**:

```javascript
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default conf;
```

**Key Features**:

- Uses `import.meta.env` to access Vite environment variables
- Wraps all values with `String()` for type safety
- Provides centralized configuration object
- Exported as default export for easy importing

---

## Environment Variables Breakdown

### VITE_APPWRITE_URL

- **Current Value**: `"https://fra.cloud.appwrite.io/v1"`
- **Purpose**: Appwrite API endpoint URL
- **Region**: Frankfurt (fra)
- **API Version**: v1

### VITE_APPWRITE_PROJECT_ID

- **Current Value**: `"68cd12e50022787c1326"`
- **Purpose**: Unique identifier for the Appwrite project
- **Usage**: Required for all Appwrite SDK calls

### VITE_APPWRITE_DATABASE_ID

- **Current Value**: `"68cd13d0001aafafbebd"`
- **Purpose**: Identifier for the specific database within the project
- **Usage**: Database operations and queries

### VITE_APPWRITE_COLLECTION_ID

- **Current Value**: `"articles"`
- **Purpose**: Collection name for storing blog articles
- **Usage**: Document CRUD operations

### VITE_APPWRITE_BUCKET_ID

- **Current Value**: `"68cd27f20006886d763d"`
- **Purpose**: Storage bucket identifier for file uploads
- **Usage**: Image and file storage operations

---

## Authentication Service (auth.js)

**Purpose**: Handles all authentication operations using Appwrite's Account service

**Location**: `/MegaBlog/src/appwrite/auth.js`

### Class Structure

```javascript
export class AuthService {
  client;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
}
```

### Methods Overview

#### `createAccount({email, password, name})`

- **Purpose**: Creates new user account and automatically logs them in
- **Parameters**:
  - `email`: User's email address
  - `password`: User's password
  - `name`: User's display name
- **Returns**: Login session if successful, or user account object
- **Behavior**: Uses `ID.unique()` for automatic ID generation
- **Auto-login**: Automatically calls `login()` after successful account creation

#### `login({email, password})`

- **Purpose**: Authenticates existing users
- **Parameters**:
  - `email`: User's email address
  - `password`: User's password
- **Returns**: Email password session object
- **Method**: Uses `createEmailPasswordSession()`
- **Error Handling**: Try-catch block (currently silent on errors)

#### `getAccount()`

- **Purpose**: Retrieves current authenticated user's account information
- **Returns**: User account object or `null`
- **Error Handling**: Logs errors and returns `null` on failure
- **Usage**: Check if user is currently authenticated

#### `logout()`

- **Purpose**: Logs out user by deleting all active sessions
- **Returns**: Success/failure response
- **Method**: Uses `deleteSessions()` to clear all user sessions
- **Error Handling**: Logs errors but doesn't throw

### Implementation Pattern

```javascript
// Singleton pattern implementation
const authService = new AuthService();
export default authService;
```

### Usage Examples

```javascript
import authService from "./appwrite/auth";

// Create new account
try {
  const session = await authService.createAccount({
    email: "user@example.com",
    password: "securePassword",
    name: "John Doe",
  });
} catch (error) {
  console.error("Account creation failed:", error);
}

// Login existing user
try {
  const session = await authService.login({
    email: "user@example.com",
    password: "securePassword",
  });
} catch (error) {
  console.error("Login failed:", error);
}

// Get current user
const currentUser = await authService.getAccount();
if (currentUser) {
  console.log("User is logged in:", currentUser.name);
}

// Logout
await authService.logout();
```

### Key Features

✅ **Singleton Pattern**: Single instance used throughout the application
✅ **Auto-login**: New users are automatically logged in after registration
✅ **Session Management**: Handles Appwrite session creation and deletion
✅ **Error Handling**: Basic error logging and graceful failures
✅ **Type Safety**: Uses proper Appwrite SDK types

### Potential Issues & Improvements

⚠️ **Silent Errors**: `login()` method catches errors but doesn't handle them
⚠️ **No Validation**: No input validation for email/password format
⚠️ **Limited Error Info**: Errors aren't passed to calling components
⚠️ **Session Management**: No check for existing sessions before creating new ones

### Recommended Enhancements

1. **Better Error Handling**:

   ```javascript
   async login({email, password}) {
       try {
           return await this.account.createEmailPasswordSession(email, password);
       } catch (error) {
           console.error("Login failed:", error);
           throw error; // Re-throw for component handling
       }
   }
   ```

2. **Input Validation**:

   ```javascript
   validateEmail(email) {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }
   ```

3. **Session Check**:
   ```javascript
   async getCurrentSession() {
       try {
           return await this.account.getSession('current');
       } catch (error) {
           return null;
       }
   }
   ```

---

## Setup Instructions

1. **Copy Sample File**:

   ```bash
   cp .env.sample .env
   ```

2. **Update Variables**:

   - Replace placeholder values with actual Appwrite credentials
   - Obtain values from Appwrite Console

3. **Import Configuration**:

   ```javascript
   import conf from "./conf/conf.js";

   // Usage
   const { appwriteUrl, appwriteProjectId } = conf;
   ```

---

## Security Considerations

- ✅ `.env` should be in `.gitignore`
- ✅ Use `VITE_` prefix for frontend-accessible variables
- ⚠️ Frontend environment variables are publicly accessible
- ⚠️ Sensitive backend credentials should use server-side environment variables
- 🔒 Consider using different projects for development/production environments

---

## Best Practices

1. **Environment Separation**: Use different Appwrite projects for development and production
2. **Type Safety**: The `String()` wrapper ensures consistent string types
3. **Centralization**: All environment access goes through `conf.js`
4. **Documentation**: Keep this notes file updated when adding new variables
5. **Validation**: Consider adding runtime validation for required environment variables

---

## Database & Storage Service (config.js)

**Purpose**: Handles all database operations and file storage using Appwrite's Database and Storage services

**Location**: `/MegaBlog/src/appwrite/config.js`

### Class Structure

```javascript
export class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_ENDPOINT)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
}
```

### Dependencies

```javascript
import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";
```

### Document/Post Operations

#### `createPost({title, slug, content, featuredImage, status, userId})`

- **Purpose**: Creates a new blog post document
- **Parameters**:
  - `title`: Post title
  - `slug`: URL-friendly identifier (used as document ID)
  - `content`: Post content/body
  - `featuredImage`: Featured image file ID
  - `status`: Post status (e.g., "active", "draft")
  - `userId`: Author's user ID
- **Returns**: Created document object
- **Database**: Uses `conf.APPWRITE_DATABASE_ID` and `conf.APPWRITE_COLLECTION_ID`
- **Error Handling**: Logs errors and returns undefined on failure

#### `updatePost(slug, {title, content, featuredImage, status})`

- **Purpose**: Updates an existing blog post
- **Parameters**:
  - `slug`: Document ID to update
  - Object with fields to update (title, content, featuredImage, status)
- **Returns**: Updated document object
- **Note**: `userId` is not updatable (immutable after creation)
- **Error Handling**: Logs errors and returns undefined on failure

#### `deletePost(slug)`

- **Purpose**: Deletes a blog post document
- **Parameters**:
  - `slug`: Document ID to delete
- **Returns**: `true` on success, `false` on failure
- **Error Handling**: Explicit boolean return values for success/failure

#### `getPost(slug)`

- **Purpose**: Retrieves a single blog post by slug/ID
- **Parameters**:
  - `slug`: Document ID to retrieve
- **Returns**: Document object or `false` on failure
- **Error Handling**: Returns `false` on errors

#### `getPosts(queries = [Query.equal("status", "active")])`

- **Purpose**: Retrieves multiple blog posts with optional filtering
- **Parameters**:
  - `queries`: Array of Appwrite Query objects (defaults to active posts only)
- **Default Behavior**: Only returns posts with status "active"
- **Returns**: Documents list object or `false` on failure
- **Usage Examples**:

  ```javascript
  // Get all active posts (default)
  const posts = await service.getPosts();

  // Get posts by specific user
  const userPosts = await service.getPosts([
    Query.equal("userId", "user123"),
    Query.equal("status", "active"),
  ]);

  // Get all posts regardless of status
  const allPosts = await service.getPosts([]);
  ```

### File Storage Operations

#### `uploadFile(file)`

- **Purpose**: Uploads a file to Appwrite storage bucket
- **Parameters**:
  - `file`: File object to upload
- **Returns**: File object with generated unique ID
- **ID Generation**: Uses `ID.unique()` for automatic file ID creation
- **Bucket**: Uses `conf.APPWRITE_BUCKET_ID`
- **Error Handling**: Logs errors and returns `false` on failure

#### `deleteFile(fileId)`

- **Purpose**: Deletes a file from storage bucket
- **Parameters**:
  - `fileId`: ID of file to delete
- **Returns**: `true` on success, `false` on failure
- **Error Handling**: Explicit boolean return values

#### `getFilePreview(fileId)`

- **Purpose**: Generates a preview URL for a stored file
- **Parameters**:
  - `fileId`: ID of file to preview
- **Returns**: Preview URL string
- **Usage**: Typically used for displaying images in the UI
- **No Error Handling**: Direct return from Appwrite SDK

### Implementation Pattern

```javascript
// Singleton pattern implementation
const service = new Service();
export default service;
```

### Usage Examples

```javascript
import service from "./appwrite/config";

// Create a new blog post
try {
  const post = await service.createPost({
    title: "My Blog Post",
    slug: "my-blog-post",
    content: "This is the post content...",
    featuredImage: "file123",
    status: "active",
    userId: "user456",
  });
} catch (error) {
  console.error("Failed to create post:", error);
}

// Get all active posts
const posts = await service.getPosts();
if (posts) {
  console.log("Found posts:", posts.documents.length);
}

// Upload an image
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const uploadedFile = await service.uploadFile(file);
if (uploadedFile) {
  const previewUrl = service.getFilePreview(uploadedFile.$id);
}

// Update a post
await service.updatePost("my-blog-post", {
  title: "Updated Title",
  status: "draft",
});
```

### Key Features

✅ **Singleton Pattern**: Single instance used throughout the application
✅ **CRUD Operations**: Complete Create, Read, Update, Delete functionality
✅ **File Management**: Upload, delete, and preview file operations
✅ **Query Support**: Flexible querying with Appwrite Query builder
✅ **Error Handling**: Consistent error logging patterns
✅ **Type Safety**: Uses proper Appwrite SDK types and imports

### Data Flow

1. **Post Creation**: File upload → Get file ID → Create post with file ID
2. **Post Display**: Get posts → Get file previews → Render UI
3. **Post Update**: Update document → Optionally update featured image
4. **Post Deletion**: Delete document → Delete associated files

### Error Handling Patterns

- **Document Operations**: Return `undefined` or `false` on errors
- **File Operations**: Return `false` on errors, `true` on success
- **All Methods**: Log errors to console for debugging
- **Query Operations**: Return `false` instead of throwing exceptions

### Database Schema (Inferred)

The collection expects documents with these fields:

```javascript
{
  title: String,        // Post title
  content: String,      // Post body/content
  featuredImage: String,// File ID from storage bucket
  status: String,       // "active", "draft", etc.
  userId: String,       // Author's user ID
  // slug is used as document $id
}
```

### Configuration Dependencies

- `conf.APPWRITE_ENDPOINT`: Appwrite server URL
- `conf.APPWRITE_PROJECT_ID`: Project identifier
- `conf.APPWRITE_DATABASE_ID`: Database identifier
- `conf.APPWRITE_COLLECTION_ID`: Collection name ("articles")
- `conf.APPWRITE_BUCKET_ID`: Storage bucket identifier

### Potential Issues & Improvements

⚠️ **Inconsistent Error Returns**: Mix of `undefined`, `false`, and thrown errors
⚠️ **No Validation**: No input validation for required fields
⚠️ **File Cleanup**: No automatic cleanup of orphaned files when posts are deleted
⚠️ **Query Limitations**: Default query may not suit all use cases

### Recommended Enhancements

1. **Consistent Error Handling**:

   ```javascript
   async createPost(postData) {
     try {
       return await this.databases.createDocument(/* ... */);
     } catch (error) {
       console.log("Create post error:", error);
       throw error; // Re-throw for component handling
     }
   }
   ```

2. **Input Validation**:

   ```javascript
   validatePostData({title, slug, content, userId}) {
     if (!title || !slug || !content || !userId) {
       throw new Error("Required fields missing");
     }
   }
   ```

3. **File Cleanup**:
   ```javascript
   async deletePost(slug) {
     try {
       const post = await this.getPost(slug);
       if (post.featuredImage) {
         await this.deleteFile(post.featuredImage);
       }
       await this.databases.deleteDocument(/* ... */);
       return true;
     } catch (error) {
       console.log("Delete post error:", error);
       return false;
     }
   }
   ```

---

_Last Updated: September 20, 2025_
