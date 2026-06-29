# User Management Dashboard

A responsive and modular User Management Dashboard built with React.js, Axios, and vanilla CSS. This application performs full CRUD operations using the open-source mock REST API, JSONPlaceholder.

## 🚀 Features
- **Structured Relational Grid (User Table):** Displays core attributes including ID, First Name, Last Name, Email, and Department.
- **Real-Time Client-Side Search:** Instantly filters records matching query strings against First Name, Last Name, or Email.
- **Dynamic Multi-Field Filtering:** Cohort targeting enabled via a Department selection filter popup.
- **Bidirectional Lexicographical Sorting:** Clickable table headers that dynamically reorganize rows alphabetically (A-Z / Z-A).
- **Interactive Forms (Add & Edit User):** Client-side validated contextual modals with explicit error flags.
- **Safety Prompt Deletion:** Accidental omission prevention through explicit visual delete confirmation modals.
- **Custom Pagination Framework:** State-aware window controls supporting user-defined page-size increments (10, 25, 50, 100 entries).
- **Robust Error Interception:** Safe `try...catch` implementation preventing system crashes during network or API latency.

## 🛠️ Folder Structure Map
```text
user-management-dashboard/
├── src/
│   ├── api/
│   │   └── userService.js        # Axios network configuration layer
│   ├── components/
│   │   ├── Header.jsx            # Application layout header
│   │   ├── SearchBar.jsx         # Live search bar input query component
│   │   ├── UserTable.jsx         # Full tabular structural view layout
│   │   ├── UserRow.jsx           # Relational individual data rows with actions
│   │   ├── UserForm.jsx          # Contextual validation modal for Add/Edit
│   │   ├── Pagination.jsx        # Data sizing controls and boundary buttons
│   │   ├── FilterPopup.jsx       # Multi-criteria cohort filtering options
│   │   └── ConfirmDelete.jsx     # Safety check modal
│   ├── utils/
│   │   └── validators.js         # Centralized form input validation engines
│   ├── App.jsx                   # Orchestrator root component containing shared state
│   ├── index.css                 # Responsive CSS framework rules
│   └── main.jsx                  # Application entry point
└── README.md                     # Deployment documentation
⚙️ Installation & Setup Instructions
Clone the Repository:

Bash
git clone <your-repository-url>
cd user-management-dashboard
Install Required Packages:

Bash
npm install
Run the Development Server Locally:

Bash
npm run dev
⚙️ Engineering Assumptions & Constraints
Name Extraction Logic: Because JSONPlaceholder returns a consolidated full name string, the application programmatically splits the string at the first blank space. The initial element becomes firstName, while the remaining elements are concatenated as lastName.

Department Fallback Mapping: The baseline API does not contain a field representing business structure departments. During initialization, a default placeholder value of "IT" is uniformly mapped across the retrieved data arrays. Users can subsequently edit this value dynamically inside the UI.

🧠 Technical Challenges Faced
JSONPlaceholder Read-Only Status: The target REST endpoint is simulated and does not persist state updates natively on the server.

Solution: The state persistence layer was completely implemented within React's application state memory to mimic full CRUD operations on the client side.
