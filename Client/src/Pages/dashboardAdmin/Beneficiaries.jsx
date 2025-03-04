// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export function Beneficiaries() {
// //   const [beneficiaries, setBeneficiaries] = useState([]);
// //   const [editingBeneficiary, setEditingBeneficiary] = useState(null);
// //   const [newStatus, setNewStatus] = useState("");
// //   const [filterStatus, setFilterStatus] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const beneficiariesPerPage = 5;

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:4000/api/beneficiaries") // API endpoint لجلب المستفيدين
// //       .then((response) => {
// //         setBeneficiaries(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("حدث خطأ أثناء جلب بيانات المستفيدين!", error);
// //       });
// //   }, []);

// //   const handleStatusChange = (beneficiaryId, status) => {
// //     setEditingBeneficiary(beneficiaryId);
// //     setNewStatus(status);
// //   };

// //   const updateStatus = (beneficiaryId) => {
// //     if (!newStatus) {
// //       alert("يرجى تحديد الحالة المناسبة.");
// //       return;
// //     }

// //     axios
// //       .put("http://localhost:4000/api/beneficiaries/update-status", {
// //         beneficiaryId: beneficiaryId,
// //         status: newStatus,
// //       })
// //       .then((response) => {
// //         alert(response.data.message);
// //         setBeneficiaries((prevBeneficiaries) =>
// //           prevBeneficiaries.map((beneficiary) =>
// //             beneficiary.id === beneficiaryId
// //               ? { ...beneficiary, status: newStatus }
// //               : beneficiary
// //           )
// //         );
// //         setEditingBeneficiary(null);
// //         setNewStatus("");
// //       })
// //       .catch((error) => {
// //         console.error("خطأ في تحديث حالة المستفيد:", error);
// //         alert("فشل في تحديث حالة المستفيد.");
// //       });
// //   };

// //   const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
// //     return !filterStatus || beneficiary.status === filterStatus;
// //   });

// //   const indexOfLastBeneficiary = currentPage * beneficiariesPerPage;
// //   const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
// //   const currentBeneficiaries = filteredBeneficiaries.slice(
// //     indexOfFirstBeneficiary,
// //     indexOfLastBeneficiary
// //   );

// //   const statusColors = {
// //     approved: "bg-emerald-100 text-emerald-800",
// //     pending: "bg-amber-100 text-amber-800",
// //   };

// //   const statusTranslations = {
// //     approved: "موافق",
// //     pending: "قيد الانتظار",
// //   };

// //   return (
// //     <div className="mt-12 mb-8 flex flex-col gap-8">
// //       <div className="bg-white rounded-xl shadow-md overflow-hidden">
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
// //           <h2 className="text-xl font-bold text-white">جدول المستفيدين</h2>
// //         </div>

// //         <div className="p-6">
// //           {/* Filter */}
// //           <div className="mb-6" dir="rtl">
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               فلترة حسب الحالة
// //             </label>
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //             >
// //               <option value="">الكل</option>
// //               <option value="pending">قيد الانتظار</option>
// //               <option value="approved">موافق</option>
// //             </select>
// //           </div>

// //           {/* Modal for editing status */}
// //           {editingBeneficiary && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-lg p-6 w-96 shadow-xl" dir="rtl">
// //                 <h3 className="text-lg font-bold mb-4">تعديل حالة المستفيد</h3>
// //                 <div className="mb-4">
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     الحالة الجديدة
// //                   </label>
// //                   <select
// //                     value={newStatus}
// //                     onChange={(e) => setNewStatus(e.target.value)}
// //                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   >
// //                     <option value="">اختر الحالة</option>
// //                     <option value="pending">قيد الانتظار</option>
// //                     <option value="approved">موافق</option>
// //                   </select>
// //                 </div>
// //                 <div className="flex justify-end gap-2">
// //                   <button
// //                     onClick={() => {
// //                       setEditingBeneficiary(null);
// //                       setNewStatus("");
// //                     }}
// //                     className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
// //                   >
// //                     إلغاء
// //                   </button>
// //                   <button
// //                     onClick={() => updateStatus(editingBeneficiary)}
// //                     className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
// //                   >
// //                     حفظ
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Table */}
// //           <div className="overflow-x-auto rounded-lg border border-gray-200">
// //             <table className="w-full min-w-full divide-y divide-gray-200" dir="rtl">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   {[
// //                     "الاسم",
// //                     "الحالة",
// //                     "العنوان",
// //                     "الحاجات",
// //                     "الوصف",
// //                     "إجراءات",
// //                   ].map((el) => (
// //                     <th
// //                       key={el}
// //                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                     >
// //                       {el}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {currentBeneficiaries.length > 0 ? (
// //                   currentBeneficiaries.map((beneficiary) => (
// //                     <tr
// //                       key={beneficiary.id}
// //                       className="hover:bg-gray-50 transition-colors"
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-gray-900">
// //                           {beneficiary.statusPerson}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span
// //                           className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                             statusColors[beneficiary.status] ||
// //                             "bg-gray-100 text-gray-800"
// //                           }`}
// //                         >
// //                           {statusTranslations[beneficiary.status] ||
// //                             beneficiary.status}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {beneficiary.address || "-"}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {JSON.stringify(beneficiary.needs)}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {beneficiary.needsDescription || "-"}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                         <button
// //                           onClick={() =>
// //                             handleStatusChange(beneficiary.id, beneficiary.status)
// //                           }
// //                           className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors"
// //                         >
// //                           تعديل
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td
// //                       colSpan="6"
// //                       className="px-6 py-4 text-center text-sm text-gray-500"
// //                     >
// //                       لا توجد بيانات متاحة
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination Controls */}
// //           <div className="flex justify-center items-center mt-6 gap-2" dir="rtl">
// //             <button
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage(currentPage - 1)}
// //               className={`px-4 py-2 rounded-lg ${
// //                 currentPage === 1
// //                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// //                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
// //               } transition-colors`}
// //             >
// //               السابق
// //             </button>

// //             <div className="flex items-center">
// //               {Array.from(
// //                 {
// //                   length: Math.min(
// //                     5,
// //                     Math.ceil(filteredBeneficiaries.length / beneficiariesPerPage)
// //                   ),
// //                 },
// //                 (_, i) => {
// //                   const pageNum = i + 1;
// //                   return (
// //                     <button
// //                       key={i}
// //                       onClick={() => setCurrentPage(pageNum)}
// //                       className={`w-8 h-8 mx-1 rounded-full ${
// //                         currentPage === pageNum
// //                           ? "bg-indigo-600 text-white"
// //                           : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                       } transition-colors`}
// //                     >
// //                       {pageNum}
// //                     </button>
// //                   );
// //                 }
// //               )}

// //               {Math.ceil(filteredBeneficiaries.length / beneficiariesPerPage) > 5 && (
// //                 <span className="px-2">...</span>
// //               )}
// //             </div>

// //             <button
// //               disabled={indexOfLastBeneficiary >= filteredBeneficiaries.length}
// //               onClick={() => setCurrentPage(currentPage + 1)}
// //               className={`px-4 py-2 rounded-lg ${
// //                 indexOfLastBeneficiary >= filteredBeneficiaries.length
// //                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// //                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
// //               } transition-colors`}
// //             >
// //               التالي
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export function Beneficiaries() {
//   const [beneficiaries, setBeneficiaries] = useState([]);
//   const [editingBeneficiary, setEditingBeneficiary] = useState(null);
//   const [newStatus, setNewStatus] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const beneficiariesPerPage = 5;


// useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/beneficiaries") // API endpoint لجلب المستفيدين
//       .then((response) => {
//         // تأكد من أن البيانات التي تم إرجاعها هي مصفوفة
//         if (Array.isArray(response.data.data)) {
//           setBeneficiaries(response.data.data);
//         } else {
//           console.error("البيانات ليست مصفوفة:", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("حدث خطأ أثناء جلب بيانات المستفيدين!", error);
//       });
//   }, []);
  
//   const handleStatusChange = (beneficiaryId, status) => {
//     setEditingBeneficiary(beneficiaryId);
//     setNewStatus(status);
//   };

//   const updateStatus = (beneficiaryId) => {
//     if (!newStatus) {
//       alert("يرجى تحديد الحالة المناسبة.");
//       return;
//     }

  
//     axios
//   .put("http://localhost:4000/api/beneficiaries/update-status", {
//     beneficiaryId: beneficiaryId,
//     status: newStatus === "approved" ? "موافق عليه" : "قيد الانتظار",
//   })
//   .then((response) => {
//     alert(response.data.message);
//     setBeneficiaries((prevBeneficiaries) =>
//       prevBeneficiaries.map((beneficiary) =>
//         beneficiary.id === beneficiaryId
//           ? { ...beneficiary, status: newStatus }
//           : beneficiary
//       )
//     );
//     setEditingBeneficiary(null);
//     setNewStatus("");
//   })
//   .catch((error) => {
//     console.error("خطأ في تحديث حالة المستفيد:", error);
//     alert("فشل في تحديث حالة المستفيد.");
//   });

//   };

// //   const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
// //     return !filterStatus || beneficiary.status === filterStatus;
// //   });
// const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
//     return !filterStatus || beneficiary.status.trim().toLowerCase() === filterStatus.trim().toLowerCase();
//   });
//   const indexOfLastBeneficiary = currentPage * beneficiariesPerPage;
//   const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
//   const currentBeneficiaries = filteredBeneficiaries.slice(
//     indexOfFirstBeneficiary,
//     indexOfLastBeneficiary
//   );

//   const statusColors = {
//     approved: "bg-emerald-100 text-emerald-800",
//     pending: "bg-amber-100 text-amber-800",
//   };

//   const statusTranslations = {
//     approved: "موافق",
//     pending: "قيد الانتظار",
//   };

//   return (
//     <div className="mt-12 mb-8 flex flex-col gap-8">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
//           <h2 className="text-xl font-bold text-white">جدول المستفيدين</h2>
//         </div>

//         <div className="p-6">
//           {/* Filter */}
//           <div className="mb-6" dir="rtl">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               فلترة حسب الحالة
//             </label>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value="">الكل</option>
//               <option value="قيد الانتظار">قيد الانتظار</option>
//               <option value="موافق عليه">موافق</option>
//             </select>
//           </div>

//           {/* Modal for editing status */}
//           {editingBeneficiary && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 w-96 shadow-xl" dir="rtl">
//                 <h3 className="text-lg font-bold mb-4">تعديل حالة المستفيد</h3>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     الحالة الجديدة
//                   </label>
//                   <select
//                     value={newStatus}
//                     onChange={(e) => setNewStatus(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="">اختر الحالة</option>
//                     <option value="pending">قيد الانتظار</option>
//                     <option value="approved">موافق</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <button
//                     onClick={() => {
//                       setEditingBeneficiary(null);
//                       setNewStatus("");
//                     }}
//                     className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
//                   >
//                     إلغاء
//                   </button>
//                   <button
//                     onClick={() => updateStatus(editingBeneficiary)}
//                     className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
//                   >
//                     حفظ
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Table */}
//           <div className="overflow-x-auto rounded-lg border border-gray-200">
//             <table className="w-full min-w-full divide-y divide-gray-200" dir="rtl">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {[
//                     "الاسم",
//                     "الحالة",
//                     "العنوان",
//                     "الحاجات",
//                     "الوصف",
//                     "إجراءات",
//                   ].map((el) => (
//                     <th
//                       key={el}
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       {el}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentBeneficiaries.length > 0 ? (
//                   currentBeneficiaries.map((beneficiary) => (
//                     <tr
//                       key={beneficiary.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {beneficiary.statusPerson}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             statusColors[beneficiary.status] ||
//                             "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {statusTranslations[beneficiary.status] ||
//                             beneficiary.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {beneficiary.address || "-"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {JSON.stringify(beneficiary.needs)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {beneficiary.needsDescription || "-"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() =>
//                             handleStatusChange(beneficiary.id, beneficiary.status)
//                           }
//                           className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors"
//                         >
//                           تعديل
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="px-6 py-4 text-center text-sm text-gray-500"
//                     >
//                       لا توجد بيانات متاحة
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center mt-6 gap-2" dir="rtl">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className={`px-4 py-2 rounded-lg ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//               } transition-colors`}
//             >
//               السابق
//             </button>

//             <div className="flex items-center">
//               {Array.from(
//                 {
//                   length: Math.min(
//                     5,
//                     Math.ceil(filteredBeneficiaries.length / beneficiariesPerPage)
//                   ),
//                 },
//                 (_, i) => {
//                   const pageNum = i + 1;
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? "bg-indigo-600 text-white"
//                           : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//                       } transition-colors`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//               )}
//             </div>

//             <button
//               disabled={currentPage === Math.ceil(filteredBeneficiaries.length / beneficiariesPerPage)}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className={`px-4 py-2 rounded-lg ${
//                 currentPage === Math.ceil(filteredBeneficiaries.length / beneficiariesPerPage)
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//               } transition-colors`}
//             >
//               التالي
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Chip,
//   Button,
// } from "@material-tailwind/react";

// export function Beneficiaries() {
//   const [beneficiaries, setBeneficiaries] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/case/beneficiaries"
//         );
//         setBeneficiaries(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to approve a beneficiary
//   const handleApprove = async (id) => {
//     try {
//       // Send a PUT request to approve the beneficiary
//       await axios.put(
//         `http://localhost:4000/api/case/beneficiaries/${id}/approve`
//       );

//       // Update the state to reflect the change
//       setBeneficiaries((prevBeneficiaries) =>
//         prevBeneficiaries.map((beneficiary) =>
//           beneficiary.id === id
//             ? { ...beneficiary, approvedByAdmin: true }
//             : beneficiary
//         )
//       );

//       console.log("Beneficiary approved successfully");
//     } catch (error) {
//       console.error("Error approving beneficiary:", error);
//     }
//   };

//   return (
//     <div className="mt-12 mb-8 flex flex-col gap-12" dir="rtl">
//       <Card>
//         <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
//           <Typography variant="h6" color="white">
//             جدول المستفيدين
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px] table-auto">
//             <thead>
//               <tr>
//                 {[
//                   "المعرف",
//                   "المستخدم",
//                   "اسم الجامعة",
//                   "رقم الجامعة",
//                   "عدد الإخوة",
//                   "المبلغ",
//                   "مسار الملف",
//                   "وصف الاحتياجات",
//                   "تمت الموافقة من قبل المدير",
//                   "محذوف",
//                   "تاريخ الإنشاء",
//                   "تاريخ التحديث",
//                   "الإجراءات",
//                 ].map((el) => (
//                   <th
//                     key={el}
//                     className="border-b border-blue-gray-50 py-3 px-5 text-right"
//                   >
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-bold uppercase text-blue-gray-400"
//                     >
//                       {el}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {beneficiaries.map(
//                 (
//                   {
//                     id,
                    
//                     universityName,
//                     universityNo,
//                     brothers,
//                     amount,
//                     filePath,
//                     needsDescription,
//                     approvedByAdmin,
//                     isDeleted,
//                     createdAt,
//                     updatedAt,
//                     User,
//                   },
//                   key
//                 ) => {
//                   const className = `py-3 px-5 ${
//                     key === beneficiaries.length - 1
//                       ? ""
//                       : "border-b border-blue-gray-50"
//                   }`;

//                   return (
//                     <tr key={id}>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {id}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <div className="flex items-center gap-4">
//                           <div>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-semibold"
//                             >
//                               {`${User?.firstName} ${User?.lastName}`}
//                             </Typography>
//                             <Typography className="text-xs font-normal text-blue-gray-500">
//                               {User?.email}
//                             </Typography>
//                           </div>
//                         </div>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {universityName}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {universityNo}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {brothers}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {amount}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           <a
//                             href={`http://localhost:4000/${filePath}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             عرض الملف
//                           </a>
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {needsDescription}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Chip
//                           variant="gradient"
//                           color={approvedByAdmin ? "green" : "blue-gray"}
//                           value={
//                             approvedByAdmin ? "تمت الموافقة" : "قيد الانتظار"
//                           }
//                           className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                         />
//                       </td>
//                       <td className={className}>
//                         <Chip
//                           variant="gradient"
//                           color={isDeleted ? "red" : "green"}
//                           value={isDeleted ? "محذوف" : "نشط"}
//                           className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                         />
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {new Date(createdAt).toLocaleDateString("ar-EG")}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {new Date(updatedAt).toLocaleDateString("ar-EG")}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         {!approvedByAdmin && ( // Show the button only if not approved
//                           <Button
//                             color="green"
//                             size="sm"
//                             onClick={() => handleApprove(id)}
//                           >
//                             موافقة
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 }
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

// export default Beneficiaries;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Chip,
//   Button,
//   Input,
//   Select,
//   Option,
// } from "@material-tailwind/react";

// export function Beneficiaries() {
//   // State for beneficiaries and filtering
//   const [beneficiaries, setBeneficiaries] = useState([]);
//   const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  
//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [approvalFilter, setApprovalFilter] = useState("all");
//   const [deletionFilter, setDeletionFilter] = useState("all");
//   const [universityFilter, setUniversityFilter] = useState("");

//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/case/beneficiaries"
//         );
//         setBeneficiaries(response.data);
//         setFilteredBeneficiaries(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Approval handler (unchanged from previous version)
//   const handleApprove = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:4000/api/case/beneficiaries/${id}/approve`
//       );

//       setBeneficiaries((prevBeneficiaries) =>
//         prevBeneficiaries.map((beneficiary) =>
//           beneficiary.id === id
//             ? { ...beneficiary, approvedByAdmin: true }
//             : beneficiary
//         )
//       );

//       console.log("Beneficiary approved successfully");
//     } catch (error) {
//       console.error("Error approving beneficiary:", error);
//     }
//   };

//   // Filter logic
//   useEffect(() => {
//     let result = beneficiaries;

//     // Search filter
//     if (searchTerm) {
//       result = result.filter(
//         (b) =>
//           `${b.User?.firstName} ${b.User?.lastName}`.includes(searchTerm) ||
//           b.universityName.includes(searchTerm) ||
//           b.universityNo.toString().includes(searchTerm)
//       );
//     }

//     // Approval filter
//     if (approvalFilter !== "all") {
//       result = result.filter(
//         (b) => b.approvedByAdmin === (approvalFilter === "approved")
//       );
//     }

//     // Deletion filter
//     if (deletionFilter !== "all") {
//       result = result.filter(
//         (b) => b.isDeleted === (deletionFilter === "deleted")
//       );
//     }

//     // University filter
//     if (universityFilter) {
//       result = result.filter((b) => b.universityName === universityFilter);
//     }

//     setFilteredBeneficiaries(result);
//   }, [searchTerm, approvalFilter, deletionFilter, universityFilter, beneficiaries]);

//   // Get unique universities for filter dropdown
//   const uniqueUniversities = [
//     ...new Set(beneficiaries.map((b) => b.universityName))
//   ];

//   return (
//     <div className="mt-12 mb-8 flex flex-col gap-12" dir="rtl">
//       {/* Filter and Search Section */}
//       <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
//         {/* Search Input */}
//         <div className="w-full md:w-72">
//           <Input
//             label="بحث"
//             icon={<i className="fas fa-search" />}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Approval Filter */}
//         <Select
//           label="حالة الموافقة"
//           value={approvalFilter}
//           onChange={(val) => setApprovalFilter(val)}
//         >
//           <Option value="all">الكل</Option>
//           <Option value="approved">تمت الموافقة</Option>
//           <Option value="pending">قيد الانتظار</Option>
//         </Select>

//         {/* Deletion Filter */}
//         <Select
//           label="حالة الحذف"
//           value={deletionFilter}
//           onChange={(val) => setDeletionFilter(val)}
//         >
//           <Option value="all">الكل</Option>
//           <Option value="deleted">محذوف</Option>
//           <Option value="active">نشط</Option>
//         </Select>

//         {/* University Filter */}
//         <Select
//           label="الجامعة"
//           value={universityFilter}
//           onChange={(val) => setUniversityFilter(val)}
//         >
//           <Option value="">الكل</Option>
//           {uniqueUniversities.map((uni) => (
//             <Option key={uni} value={uni}>
//               {uni}
//             </Option>
//           ))}
//         </Select>
//       </div>

//       {/* Beneficiaries Table (similar to previous version) */}
//       <Card>
//         <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
//           <Typography variant="h6" color="white">
//             جدول المستفيدين
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px] table-auto">
//             <thead>
//               <tr>
//                 {[
//                   "المعرف",
//                   "المستخدم",
//                   "اسم الجامعة",
//                   "رقم الجامعة",
//                   "عدد الإخوة",
//                   "المبلغ",
//                   "مسار الملف",
//                   "وصف الاحتياجات",
//                   "تمت الموافقة من قبل المدير",
//                   "محذوف",
//                   "تاريخ الإنشاء",
//                   "تاريخ التحديث",
//                   "الإجراءات",
//                 ].map((el) => (
//                   <th
//                     key={el}
//                     className="border-b border-blue-gray-50 py-3 px-5 text-right"
//                   >
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-bold uppercase text-blue-gray-400"
//                     >
//                       {el}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBeneficiaries.map(
//                 (
//                   {
//                     id,
//                     universityName,
//                     universityNo,
//                     brothers,
//                     amount,
//                     filePath,
//                     needsDescription,
//                     approvedByAdmin,
//                     isDeleted,
//                     createdAt,
//                     updatedAt,
//                     User,
//                   },
//                   key
//                 ) => {
//                   const className = `py-3 px-5 ${
//                     key === filteredBeneficiaries.length - 1
//                       ? ""
//                       : "border-b border-blue-gray-50"
//                   }`;

//                   return (
//                     <tr key={id}>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {id}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <div className="flex items-center gap-4">
//                           <div>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-semibold"
//                             >
//                               {`${User?.firstName} ${User?.lastName}`}
//                             </Typography>
//                             <Typography className="text-xs font-normal text-blue-gray-500">
//                               {User?.email}
//                             </Typography>
//                           </div>
//                         </div>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {universityName}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {universityNo}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {brothers}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {amount}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           <a
//                             href={`http://localhost:4000/${filePath}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             عرض الملف
//                           </a>
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {needsDescription}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Chip
//                           variant="gradient"
//                           color={approvedByAdmin ? "green" : "blue-gray"}
//                           value={
//                             approvedByAdmin ? "تمت الموافقة" : "قيد الانتظار"
//                           }
//                           className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                         />
//                       </td>
//                       <td className={className}>
//                         <Chip
//                           variant="gradient"
//                           color={isDeleted ? "red" : "green"}
//                           value={isDeleted ? "محذوف" : "نشط"}
//                           className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                         />
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {new Date(createdAt).toLocaleDateString("ar-EG")}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {new Date(updatedAt).toLocaleDateString("ar-EG")}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         {!approvedByAdmin && (
//                           <Button
//                             color="green"
//                             size="sm"
//                             onClick={() => handleApprove(id)}
//                           >
//                             موافقة
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

// export default Beneficiaries;
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Beneficiaries() {
  // State for beneficiaries and filtering
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [deletionFilter, setDeletionFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/case/beneficiaries"
        );
        setBeneficiaries(response.data);
        setFilteredBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Approval handler
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/case/beneficiaries/${id}/approve`
      );

      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.map((beneficiary) =>
          beneficiary.id === id
            ? { ...beneficiary, approvedByAdmin: true }
            : beneficiary
        )
      );

      console.log("Beneficiary approved successfully");
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  // Filter logic
  useEffect(() => {
    let result = beneficiaries;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (b) =>
          `${b.User?.firstName} ${b.User?.lastName}`.includes(searchTerm) ||
          b.universityName.includes(searchTerm) ||
          b.universityNo.toString().includes(searchTerm)
      );
    }

    // Approval filter
    if (approvalFilter !== "all") {
      result = result.filter(
        (b) => b.approvedByAdmin === (approvalFilter === "approved")
      );
    }

    // Deletion filter
    if (deletionFilter !== "all") {
      result = result.filter(
        (b) => b.isDeleted === (deletionFilter === "deleted")
      );
    }

    // University filter
    if (universityFilter) {
      result = result.filter((b) => b.universityName === universityFilter);
    }

    setFilteredBeneficiaries(result);
  }, [searchTerm, approvalFilter, deletionFilter, universityFilter, beneficiaries]);

  // Get unique universities for filter dropdown
  const uniqueUniversities = [
    ...new Set(beneficiaries.map((b) => b.universityName))
  ];

  return (
    // <div className="container mx-auto px-4 py-8" dir="rtl">
    <div className="container mx-auto px-4 py-8 w-[80%] max-w-4xl ml-auto overflow-auto" dir="rtl">

      {/* Filters Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
          />
          <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Approval Filter */}
        <select
          value={approvalFilter}
          onChange={(e) => setApprovalFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="all">حالة الموافقة</option>
          <option value="approved">تمت الموافقة</option>
          <option value="pending">قيد الانتظار</option>
        </select>

        {/* Deletion Filter */}
        <select
          value={deletionFilter}
          onChange={(e) => setDeletionFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="all">حالة الحذف</option>
          <option value="deleted">محذوف</option>
          <option value="active">نشط</option>
        </select>

        {/* University Filter */}
        <select
          value={universityFilter}
          onChange={(e) => setUniversityFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="">الجامعة</option>
          {uniqueUniversities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#940066] text-white px-6 py-4">
          <h2 className="text-xl font-bold">جدول المستفيدين</h2>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  "المعرف",
                  "المستخدم",
                  "اسم الجامعة",
                  "رقم الجامعة",
                  "عدد الإخوة",
                  "المبلغ",
                  "مسار الملف",
                  "وصف الاحتياجات",
                  "الموافقة",
                  "الحالة",
                  "تاريخ الإنشاء",
                  "تاريخ التحديث",
                  "الإجراءات"
                ].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                  {/* Individual Cell Rendering */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {`${beneficiary.User?.firstName} ${beneficiary.User?.lastName}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {beneficiary.User?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.universityName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.universityNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.brothers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a 
                      href={`http://localhost:4000/${beneficiary.filePath}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      عرض الملف
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.needsDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${beneficiary.approvedByAdmin 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {beneficiary.approvedByAdmin ? 'تمت الموافقة' : 'قيد الانتظار'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${beneficiary.isDeleted 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'}`}
                    >
                      {beneficiary.isDeleted ? 'محذوف' : 'نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(beneficiary.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(beneficiary.updatedAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!beneficiary.approvedByAdmin && (
                      <button
                        onClick={() => handleApprove(beneficiary.id)}
                        className="bg-[#940066] text-white px-3 py-1 rounded-md hover:bg-[#7a0055] transition-colors"
                      >
                        موافقة
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results Handling */}
      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg mt-4">
          <p className="text-gray-500 text-xl">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
}

export default Beneficiaries;