import CoverImage from '../assets/cover_article_img.jpg'

type TaskProps = {
    index: number
    isChecked: boolean
    title: string
    removeTask: (id: number) => void
    changeStatus: (id: number) => void
}

export const ArticleLayoutTwo: React.FC<TaskProps> = ({index, isChecked, title, removeTask, changeStatus}) => {

    const onChange = () => {
        changeStatus(index);
    }

    return (
        <div className='group grid grid-cols-12 gap-4 items-center text-dark'>
            <a href='/url' className='col-span-4 h-full rounded-xl overflow-hidden'>
                <img src={CoverImage} alt='coverImage' aria-placeholder='blur' className='aspect-square w-full h-full object-cover group-hover:scale-105 transition-all ease-in duration-300' />
            </a>
            <div className='col-span-8 w-full'>
                <span className='uppercase text-red-600 font-semibold text-sm'>Tag</span>
                <a href='/url' className=' my-1'>
                    <h2 className='font-semibold capitalize text-lg'>
                        <span className='bg-gradient-to-r from-red-500 to-red-500 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                            Title
                        </span>
                    </h2>
                </a>
                <span className='capitalize text-dark/50 font-light text-base'>
                    {'12/05/2024'}
                </span>
            </div>
        </div>
    )
}