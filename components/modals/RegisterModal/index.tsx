"use client"
import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModal from "../../../hooks/useRegisterModal";
import useLoginModal from "../../../hooks/useLoginModal";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import Input from "@/components/inputs";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post("/api/register", data)
            .then(() => {
                toast.success("Success!")
                registerModal.onClose()
                loginModal.onOpen()
            })
            .catch((error) => {
                toast.error(error)
            })
            .finally(() => {
                setIsLoading(true)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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
                    <div>Already have an account?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">Log in</div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}/>
    );
};

export default RegisterModal;
