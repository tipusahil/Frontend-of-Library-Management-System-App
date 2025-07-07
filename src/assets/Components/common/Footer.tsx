

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center">
         <footer className="footer  sm:footer-horizontal  border border-gray-500 px-10 py-8">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
 
</footer>
<div className="py-6 px-3 flex flex-col justify-center items-center space-y-2">
    <h2 className="">Built and Designed with ❤️ by <a className="hover:underline text-blue-400" href="https://github.com/tipusahil">TipuSahil</a> </h2>
    <hr  />
    <h2>— Let Code Speak</h2>


</div>
        </div>
    );
};

export default Footer;