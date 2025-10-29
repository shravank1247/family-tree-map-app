# 🌳 Family Tree Map App

A beautiful, interactive family tree visualization application built with React, React Flow, and Firebase.

## ✨ Features

- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 🎨 **Visual Tree Builder** - Drag-and-drop interface with hierarchical layout
- 👥 **Rich Member Profiles** - Add photos, names, family names, tags, and notes
- 🌈 **Color-Coded Hierarchy** - Different colors for each generation level
- 📸 **Photo Upload** - Add photos for each family member
- 💾 **Cloud Storage** - Save trees to Firebase Firestore
- 📤 **Export Options** - Export as PNG or PDF
- 🔄 **Collapse/Expand** - Toggle visibility of branches
- ✏️ **Easy Editing** - Right-click any node to edit details
- 🗑️ **Delete Members** - Remove nodes with confirmation
- 📱 **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
```bash
cd family-tree-map-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**

Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

Enable:
- Authentication → Google Sign-In
- Firestore Database

Update `src/Services/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
family-tree-map-app/
├── src/
│   ├── components/
│   │   ├── Auth.jsx           # Authentication component
│   │   └── CustomNode.jsx     # Tree node component
│   ├── screens/
│   │   ├── Home.jsx           # Landing page
│   │   └── TreeView.jsx       # Main tree view
│   ├── Services/
│   │   └── firebase.js        # Firebase configuration
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎮 How to Use

### Getting Started
1. **Sign in** with your Google account
2. Click **"Go to Family Tree"**

### Building Your Tree
1. **Select a node** by clicking on it (it will have a blue ring)
2. Use toolbar buttons to:
   - **Add Parent** ⬆️ - Adds a parent above the selected node
   - **Add Child** ⬇️ - Adds a child below the selected node
   - **Add Sibling** ↔️ - Adds a sibling at the same level

### Editing Members
1. **Right-click** on any node to open the edit panel
2. Fill in details:
   - Name
   - Family Name
   - Tags (e.g., "Father", "Engineer", "Born 1950")
   - Notes
   - Upload photo
3. Click **Save** to update or **Cancel** to discard

### Managing Your Tree
- **Collapse/Expand**: Click the +/- button on nodes to hide/show children
- **Delete**: Right-click node → Delete button (🗑️)
- **Drag**: Drag nodes to reposition them
- **Zoom**: Use mouse wheel or controls in bottom-left
- **Pan**: Click and drag the canvas

### Saving & Exporting
- **💾 Save Tree**: Saves to Firebase Firestore
- **📸 Export PNG**: Downloads tree as image
- **📄 Export PDF**: Downloads tree as PDF
- **🔄 Reset Tree**: Creates a fresh tree (after confirmation)

## 🎨 Color Coding

Nodes are automatically color-coded by generation:
- 🟪 **Purple** - Level 0 (Root/Grandparents)
- 🔵 **Blue** - Level 1 (Parents)
- 🟢 **Green** - Level 2 (You/Siblings)
- 🟡 **Yellow** - Level 3 (Children)
- 🌸 **Pink** - Level 4+ (Grandchildren)

## 🛠️ Technologies Used

- **React** - UI framework
- **React Flow** - Interactive graph visualization
- **Dagre** - Hierarchical layout algorithm
- **Firebase** - Authentication & database
- **Tailwind CSS** - Styling
- **html2canvas** - Canvas screenshots
- **jsPDF** - PDF generation
- **Vite** - Build tool

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Firebase Authentication Error
- Make sure Google Sign-In is enabled in Firebase Console
- Check if your Firebase config is correct
- Verify authorized domains in Firebase Console

### Tree Not Saving
- Check browser console for errors
- Ensure you're logged in
- Verify Firestore rules allow read/write

### Export Not Working
- Check if html2canvas and jsPDF are installed
- Try exporting a smaller tree first
- Check browser console for errors

## 📝 Firestore Security Rules

Add these rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /familyTrees/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- React Flow team for the amazing graph library
- Firebase for authentication and storage
- Dagre for layout algorithms

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Open an issue on GitHub
- Contact support

---

**Happy Family Tree Building! 🌳👨‍👩‍👧‍👦**