# T-logs-v2

## Description

T-logs-v2 is a modern blog platform built with Next.js, allowing users to create, read, and manage blog posts. It features user authentication, rich text editing, tag management, and a responsive UI with light/dark mode support. The application uses MongoDB for data storage and integrates with UploadThing for image uploads.

## Features

- **User Authentication**: Sign in with Google to create and manage posts.
- **Blog Creation**: Admin users can create posts with titles, rich text descriptions, tags, and images.
- **Blog Viewing**: Browse latest blogs with pagination, view individual posts with author info and formatted content.
- **Tags**: Select and display tags for better categorization.
- **Theme Toggle**: Switch between light and dark modes with a custom sun-and-moon animated button.
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components for a seamless experience across devices.
- **Database Integration**: Uses MongoDB with Mongoose for efficient data handling.

## Tech Stack

- **Framework**: Next.js 14+
- **UI Components**: shadcn/ui, Lucide Icons
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google Provider
- **Rich Text Editor**: Quill
- **Styling**: Tailwind CSS, CSS Modules
- **File Uploads**: UploadThing
- **Other**: Axios for API requests, React Hook Form (implied for forms)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/t-logs-v2.git
   cd t-logs-v2