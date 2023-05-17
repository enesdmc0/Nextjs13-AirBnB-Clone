"use client"
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { signIn } from "next-auth/react"
import useLoginModel from "../../../hooks/useLoginModal";
import useRegisterModel from "../../../hooks/useRegisterModal";
import {useRouter} from "next/navigation";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import Input from "@/components/inputs";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import useLoginModal from "../../../hooks/useLoginModal";

const LoginModal = () => {
    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn("credentials", {...data, redirect: false})
            .then((callback) => {
                setIsLoading(false)

                if (callback?.ok){
                    toast.success("Logged in")
                    router.refresh();
                    loginModel.onClose();
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })

    }

    const toggle = useCallback(() => {
        loginModel.onClose();
        registerModel.onOpen()
    }, [loginModel, registerModel])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button label="Continue with Google" onClick={() => signIn("google") } outline icon={FcGoogle}/>
            <Button label="Continue with Github" onClick={() => signIn("github") } outline icon={AiFillGithub}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>First time using Airbnb?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">Create an account</div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Login"
            onClose={loginModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}/>
    );
};

export default LoginModal;
