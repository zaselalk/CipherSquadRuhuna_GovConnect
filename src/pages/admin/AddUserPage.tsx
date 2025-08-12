// import { FC, useState } from 'react';
// import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';

// const AddUserPage: FC = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [userRole, setUserRole] = useState('Doctor');
//     const [permissions, setPermissions] = useState({
//         dashboard: false,
//         diseases: false,
//         households: false,
//         users: false,
//         clinic: false
//     });

//     // const handlePermissionChange = (permission: keyof typeof permissions) => {
//     //     setPermissions({
//     //         ...permissions,
//     //         [permission]: !permissions[permission]
//     //     });
//     // };

//     // const handleSave = () => {
//     //     // Handle the save action here (e.g., send data to server)
//     //     console.log('User saved:', { firstName, lastName, userRole, permissions });
//     // };

//     return (
//         <div className="min-h-screen bg-gray-100 flex">
//         {/* Reusable Sidebar */}
//         <AdminSlidebar />

//             {/* Main Content */}
//             <div className="flex-1 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-semibold text-[#008FFB]">Add User</h2>
//                 </div>

//                 {/* Add User Form */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <div className="flex justify-end">
//                         <button className="text-red-500 text-xl" onClick={() => console.log('Close modal')}>
//                             <i className="fas fa-times"></i>
//                         </button>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
//                         <input
//                             type="text"
//                             id="first-name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
//                             placeholder="Enter first name"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
//                         <input
//                             type="text"
//                             id="last-name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
//                             placeholder="Enter last name"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="user-role" className="block text-sm font-medium text-gray-700">User Role</label>
//                         <select
//                             id="user-role"
//                             value={userRole}
//                             onChange={(e) => setUserRole(e.target.value)}
//                             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
//                         >
//                             <option value="Doctor">Doctor</option>
//                             <option value="Nurse">Nurse</option>
//                             <option value="Staff">Staff</option>
//                         </select>
//                     </div>

//                     <div className="mb-4">
//                         <p className="font-medium text-gray-700">Permissions</p>
//                         <div className="flex flex-wrap">
//                             {['dashboard', 'diseases', 'households', 'users', 'clinic'].map((permission) => (
//                                 <div key={permission} className="mr-4 mb-2">
//                                     <label className="inline-flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             className="form-checkbox"
//                                             checked={permissions[permission as keyof typeof permissions]}
//                                         // onChange={() => handlePermissionChange(permission)}
//                                         />
//                                         <span className="ml-2 capitalize text-sm text-gray-700">{permission}</span>
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleSave}
//                             className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddUserPage;
