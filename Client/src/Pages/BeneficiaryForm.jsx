
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BeneficiaryForm = ({ editingBeneficiary, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || {
      userId: "",
      universityName: "",
      universityNo: "",
      brothers: "",
      amount: "",
      needsDescription: "",
      file: null,
    }
  );
  
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (editingBeneficiary) {
        await axios.put(`http://localhost:4000/api/beneficiaries/${existingData.id}`, formDataToSend);
        setMessage("تم تحديث الطلب بنجاح!");
      } else {
        await axios.post("http://localhost:4000/api/case/beneficiary", formDataToSend);
        setMessage("تم إرسال الطلب بنجاح!");
      }
      setMessageType("success");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-8 text-right" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#940066] mb-6">
        {editingBeneficiary ? "تعديل طلب المستفيد" : "طلب منحة "}
      </h2>

      {message && (
        <div className={`p-4 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="userId" placeholder="معرف المستخدم" value={formData.userId} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="text" name="universityName" placeholder="اسم الجامعة" value={formData.universityName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="universityNo" placeholder="الرقم الجامعي" value={formData.universityNo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="brothers" placeholder="عدد الإخوة في الجامعة" value={formData.brothers} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="amount" placeholder="المبلغ المطلوب" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <textarea name="needsDescription" placeholder="وصف الحاجة" value={formData.needsDescription} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="file" onChange={handleFileChange} className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-gray-50" />
        
        <button type="submit" className="w-full bg-[#940066] text-white py-2 px-4 rounded-md hover:bg-[#671F79] transition duration-200 inline-block">
          {editingBeneficiary ? "تحديث الطلب" : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
};

export default BeneficiaryForm;






// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie"; // استيراد مكتبة js-cookie

// const BeneficiaryForm = ({ editingBeneficiary, existingData }) => {
//   const [formData, setFormData] = useState(
//     existingData || {
//       universityName: "",
//       universityNo: "",
//       brothers: "",
//       amount: "",
//       needsDescription: "",
//       file: null,
//     }
//   );

//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // الحصول على التوكن من الكوكيز
//     const token = Cookies.get("token");

//     if (!token) {
//       setMessage("يجب تسجيل الدخول أولاً");
//       setMessageType("error");
//       return;
//     }

//     // فك تشفير التوكن لاستخراج userId
//     const decodedToken = JSON.parse(atob(token.split(".")[1])); // فك تشفير الجزء الثاني (payload)
//     const userId = decodedToken.id; // استخراج userId من التوكن

//     if (!userId) {
//       setMessage("تعذر الحصول على معرف المستخدم");
//       setMessageType("error");
//       return;
//     }

//     // إعداد FormData لإرسال البيانات
//     const formDataToSend = new FormData();
//     formDataToSend.append("userId", userId); // إضافة userId إلى البيانات المرسلة
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     try {
//       if (editingBeneficiary) {
//         await axios.put(`http://localhost:4000/api/beneficiaries/${existingData.id}`, formDataToSend);
//         setMessage("تم تحديث الطلب بنجاح!");
//       } else {try {
//         const response = await axios.post("http://localhost:4000/api/case/beneficiary", formDataToSend);
//         setMessage("تم إرسال الطلب بنجاح!");
//         setMessageType("success");
//         navigate("/");
//       } catch (error) {
//         console.error("Error:", error.response?.data); // عرض تفاصيل الخطأ
//         setMessage(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
//         setMessageType("error");
//       }
//       }
//       setMessageType("success");
//       navigate("/");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-8 text-right" dir="rtl">
//       <h2 className="text-2xl font-bold text-center text-[#940066] mb-6">
//         {editingBeneficiary ? "تعديل طلب المستفيد" : "طلب منحة "}
//       </h2>

//       {message && (
//         <div className={`p-4 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="universityName" placeholder="اسم الجامعة" value={formData.universityName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
//         <input type="number" name="universityNo" placeholder="الرقم الجامعي" value={formData.universityNo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
//         <input type="number" name="brothers" placeholder="عدد الإخوة في الجامعة" value={formData.brothers} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
//         <input type="number" name="amount" placeholder="المبلغ المطلوب" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
//         <textarea name="needsDescription" placeholder="وصف الحاجة" value={formData.needsDescription} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
//         <input type="file" onChange={handleFileChange} className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-gray-50" />
        
//         <button type="submit" className="w-full bg-[#940066] text-white py-2 px-4 rounded-md hover:bg-[#671F79] transition duration-200 inline-block">
//           {editingBeneficiary ? "تحديث الطلب" : "إرسال الطلب"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BeneficiaryForm;