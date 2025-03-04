import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                {/* الشعار + الاسم */}
                <div className="flex items-center space-x-3">
                    <img
                        src="src/assets/image.png"
                        alt="شعار أرومة"
                        className="w-20 h-20 object-contain"
                    />
                    <span className="text-3xl font-bold text-[#940066] tracking-wide"
                        style={{
                            fontFamily: "'Tajawal', sans-serif",
                            letterSpacing: "1px",
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
                        }}>
                        أرومة
                    </span>
                </div>

                {/* قائمة سطح المكتب */}
                <div className="hidden md:flex flex-1 justify-center space-x-8">
                    <Link to="/" className="text-lg font-medium text-[#940066] hover:text-[#b00077] transition-all duration-300">الرئيسية</Link>
                    <Link to="/about" className="text-lg font-medium text-[#940066] hover:text-[#b00077] transition-all duration-300">من نحن</Link>
                    <Link to="/SuccessStoriesCards" className="text-lg font-medium text-[#940066] hover:text-[#b00077] transition-all duration-300">قصص نجاح</Link>
                    <Link to="/contact" className="text-lg font-medium text-[#940066] hover:text-[#b00077] transition-all duration-300">تواصل معنا</Link>

                    <Link
                        to="/donate"
                        className="text-lg font-medium bg-[#ECECEC] text-[#940066] px-4 py-2 rounded-full shadow-md border border-[#940066] transition-all hover:bg-[#940066] hover:text-white">
                         فرص التبرع
                    </Link>

                    <Link
                        to="/BeneficiaryForm"
                        className="text-lg font-medium bg-[#940066] text-[#ECECEC] px-4 py-2 rounded-full shadow-md transition-all hover:bg-[#ECECEC] hover:text-[#940066] hover:border hover:border-[#940066]">
                        طلب منحة
                    </Link>
                </div>

                {/* زر القائمة للجوال */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <svg className="w-7 h-7 text-[#940066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* قائمة الجوال */}
            {isOpen && (
                <div className="md:hidden bg-white text-[#940066] p-4 space-y-4 shadow-lg rounded-b-lg">
                    <Link to="/" className="text-lg block hover:text-[#b00077] transition-all duration-300">الرئيسية</Link>
                    <Link to="/about" className="text-lg block hover:text-[#b00077] transition-all duration-300">من نحن</Link>
                    <Link to="/success" className="text-lg block hover:text-[#b00077] transition-all duration-300">قصص نجاح</Link>
                    <Link to="/contact" className="text-lg block hover:text-[#b00077] transition-all duration-300">تواصل معنا</Link>
                    <Link to="/donate" className="text-lg block bg-[#ECECEC] text-[#940066] py-2 rounded-full text-center border border-[#940066] hover:bg-[#940066] hover:text-white transition-all">تبرع الآن</Link>
                    <Link to="/scholarship" className="text-lg block bg-[#940066] text-[#ECECEC] py-2 rounded-full text-center hover:bg-[#ECECEC] hover:text-[#940066] hover:border hover:border-[#940066] transition-all">طلب منحة</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
