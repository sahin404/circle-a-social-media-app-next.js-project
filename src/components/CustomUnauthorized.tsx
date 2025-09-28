import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";

const CustomUnauthorized = () => {
  return (
    <div>
      <div className="flex justify-center min-h-screen items-center ">
        <div className="w-3/7">
          <UnAuthenticatedSidebar />
        </div>
      </div>
    </div>
  );
};

export default CustomUnauthorized;
