
import React from "react";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <AuthForm isLogin={false} />
      </div>
    </Layout>
  );
};

export default Register;
