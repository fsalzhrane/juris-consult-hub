
import React from "react";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <AuthForm isLogin={true} />
      </div>
    </Layout>
  );
};

export default Login;
