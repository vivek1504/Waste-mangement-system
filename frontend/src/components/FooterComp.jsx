export const FooterComp = () => {
    return  <footer className="bg-slate-300 rounded-lg shadow mt-4 bottom-0">
        <div className="w-full  p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm ml-10 text-black sm:text-center">© 2024 <a href="#" className="hover:underline mr-1">Waste Management System™.</a> All Rights Reserved.
        </span>
        <span>
        <ul className="flex flex-wrap items-center mr-10 mt-3 text-sm  font-medium text-black sm:mt-0">
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul>
        </span>
        </div>
    </footer>
    
}