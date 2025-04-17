
import SignInWithGoogle from "./sign-in-with-google";

const Home = () => {
 return (<>
 
 <section>

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ">
        <h1 className="text-center text-2xl font-bold mb-4">Welcome to Mini SaaS DashBoard - SuruchiRaj</h1>
        <p className="text-center text-gray-700 mb-4">Your one-stop solution for all your needs.</p>
        <p className="text-center text-gray-700 mb-4">Get started by signing in or creating an account.</p>
        <SignInWithGoogle/>
      </div>
    </div>
 </section>
 
 </>);
};

export default Home;