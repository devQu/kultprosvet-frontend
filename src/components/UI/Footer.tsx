import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Telegram from '../../assets/telegram.png'
import Vk from '../../assets/vk.png'
import Youtube from '../../assets/youtube.png'

const Footer = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);
    // console.log(errors);

    return (
        <footer className='mt-16 rounded-2xl bg-dark m-10 flex flex-col items-center text-light'>
            <h3 className='mt-16 font-medium text-center capitalize text-4xl px-4'>
                Part One
            </h3>
            <p className='mt-5 px-4 text-center w-3/5 font-light text-base'>
                Paragraphe
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-6 min-w-[384px] flex items-stretch bg-light p-2 rounded' >
                <input type="email" placeholder="Введите свой email" {...register("email", {required: true, maxLength: 80})} className='w-full bg-transparent pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1' />

                <input type="submit" className='bg-dark text-light cursor-pointer font-medium rounded px-5 py-1' />
            </form>

            <div className='flex items-center mt-8'>
                <a href='http://hello.com' className='inline-block w-6 h-6 mr-4'>
                    <img src={Telegram} alt='telegram' className='hover:scale-125 transition-all ease duration-200' />
                </a>
                <a href='http://hello.com' className='inline-block w-6 h-6 mr-4'>
                    <img src={Vk} alt='vk' className='hover:scale-125 transition-all ease duration-200' />
                </a>
                <a href='http://hello.com' className='inline-block w-6 h-6 mr-4'>
                    <img src={Youtube} alt='telegram' className='hover:scale-125 transition-all ease duration-200' />
                </a>
            </div>

            <div className='w-full mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex flex-row items-center justify-between' >
                <span>2024 Культпросвет</span>
                {/* <a href='/sitemap.xml' className='text-center underline'>sitemap.xml</a> */}
            </div>

        </footer>
    )
}

export default Footer
