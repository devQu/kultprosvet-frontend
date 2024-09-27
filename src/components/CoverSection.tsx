import CoverImage from '../assets/cover_article_img.jpg'
import Tag from './UI/Tag'

// const as = 'flex flex-col items-start justify-end mx-10 relative h-[85vh]'

const CoverSection = () => {
  return (
    <div className="w-full inline-block">
        <article className='flex flex-col items-start justify-end mx-10 relative h-[85vh]'>
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0' />
            <img src={CoverImage} alt='coverImage' aria-placeholder='blur' className='absolute w-full h-full object-center object-cover rounded-3xl -z-10' />
            <div className='w-3/4 p-16 flex flex-col items-start justify-center z-0 text-light'>
                <Tag link='/categories/tag' name='Tag' />
                <a href='/url' className='mt-6'>
                    <h1 className='font-bold capitalize text-4xl'>
                        <span className='bg-gradient-to-r  from-red-700 to-red-700 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                            Title
                        </span>
                    </h1>
                </a>
                <p className='inline-block mt-4 text-xl font-light'>Description</p>
            </div>
        </article>
    </div>
  )
}

export default CoverSection
