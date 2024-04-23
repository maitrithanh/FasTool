"use client"
import Image from "next/image";
import { useState } from 'react';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";

export default function Home() {
  const [images, setImages] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [check,setCheck]=useState(false)
    const [upload, setUpload] = useState(false)
  
    const handleFileChange = (e) => {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
      previewFile()
    };
  
    const generatePDF = () => {
      const doc = new jsPDF();
      if(!upload) {
        toast.error('Vui lòng tải ảnh lên!')
      }
      images.forEach((image, index) => {
        if (index !== 0) {
          doc.addPage();

        }
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          doc.addImage(reader.result, 'JPEG', 10, 10, 190, 0);
          if (index === images.length - 1) {
            toast.success('Chuyển thành PDF Thành Công!')
            setPdf(doc);
          }
        };
      });
      setCheck(true)
    };
  
    const downloadPDF = () => {
      if (pdf) {
        pdf.save('converted.pdf');
      }
    };

    function previewFile() {
      var preview = document.querySelector('#previewIMG');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
    
      reader.onloadend = function () {
        preview.src = reader.result;
      }
    
      if (file) {
        toast.success('Tải ảnh lên Thành Công!')
        setUpload(true)
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }
  return (
    <div className="relative w-full">
    <div className="fixed z-10 p-4 md:px-16 px-4 top-0 w-full flex justify-between items-center">
      <div className="flex justify-center items-center font-bold text-green-800"> 
        <Image src={"/logo.webp"} alt="logo" height={20} width={20} />
        FasTool
      </div>
      <Link href={"https://maitrithanh.site"} target="blank">&copy; 2024 FasTool. Made with ❤️</Link>
    </div>
    <main className="relative flex h-screen justify-center flex-col items-center p-4 bg-[url(/bg.webp)] ">

    <div><Toaster/></div>
    <label htmlFor="uploadImg" className=" cursor-pointer hover:scale-105 transition-all bg-[#a1c038] backdrop-blur-xl p-2 px-4 text-xl rounded-lg text-white hover:opacity-80 flex justify-center items-center gap-2">
    <Image src={"/icons/upload.webp"} alt="generate" height={20} width={20} />Tải ảnh lên</label>
    <input type="file" id="uploadImg" className=" invisible" accept=".jpg, .jpeg, .png" multiple onChange={handleFileChange}/>
    <div className={`max-w-[800px] md:max-h-[600px] overflow-auto mb-36 p-4 rounded-lg bg-white ${upload ? "visible" : "hidden"}`}>
    <img id="previewIMG" className="object-cover shadow-xl" src="/no-image.webp" height="200" alt="Image preview..."/> 
    </div>

    <div className="absolute bottom-8 bg-white h-[88px] w-fit shadow-xl rounded-full flex justify-center items-center">
    <button className={`hover:bg-gradient-to-r lg:w-[245px] bg-white rounded-s-full ${pdf ? "border-r border-[#68686828]" : "rounded-e-full"} from-[#EAF6FF] to-[#F3FFE9] transition-all p-4 backdrop-blur-2xl h-full group`} onClick={generatePDF}>
      <div className="flex justify-center group-hover:-translate-y-2 transition-all duration-300">
        <Image src={"/icons/generate.webp"} alt="generate" height={20} width={20} />
      </div>
      <div className="flex justify-center font-medium">Chuyển đổi PDF</div>
    </button>
    {pdf &&
    <button className=" hover:bg-gradient-to-r from-[#EAF6FF] bg-white lg:w-[245px] rounded-e-full to-[#F3FFE9] transition-all p-4 backdrop-blur-2xl h-full group" onClick={downloadPDF}>
      <div className="flex justify-center group-hover:-translate-y-2 transition-all duration-300">
        <Image src={"/icons/download.webp"} alt="download" height={20} width={20} />
      </div>
      <div className="flex justify-center font-medium">Tải PDF</div>
    </button>
    }
    </div>
    </main></div>
  );
}
