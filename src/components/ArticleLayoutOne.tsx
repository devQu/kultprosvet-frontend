import CoverImage from '../assets/cover_article_img.jpg'
import Tag from './UI/Tag'

type TaskProps = {
    index: number
    isChecked: boolean
    title: string
    removeTask: (id: number) => void
    changeStatus: (id: number) => void
}

export const ArticleLayoutOne: React.FC<TaskProps> = ({index, isChecked, title, removeTask, changeStatus}) => {

    const onChange = () => {
        changeStatus(index);
    }

    return (
        <div className="group inline-block overflow-hidden rounded-xl">
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-10' />
            <img src={CoverImage} alt='coverImage' aria-placeholder='blur' className='object-center object-cover rounded-3xl w-full h-full group-hover:scale-105 transition-all ease-in duration-300' />
            <div className='w-full absolute bottom-0 p-10 z-20'>
                <Tag link='/categories/tag' name='Tag' className='px-6 text-sm py-2 !border' />
                <a href='/url' className='mt-6'>
                    <h2 className='font-bold capitalize text-2xl text-light '>
                        <span className='bg-gradient-to-r from-red-700 to-red-700 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                            Title
                        </span>
                    </h2>
                </a>
            </div>
        </div>
    )
}