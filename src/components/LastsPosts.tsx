import { ComponentType, useCallback, useEffect } from "react"
import { ArticleLayoutOne } from "./ArticleLayoutOne"
// import NewTaskInputClasses from './NewTaskInput.module.scss';
import { AppStateType } from "../store/reducer/rootReducer";
import { getAllTasks, createNewArticle, deleteArticleById } from "../store/actions/articlesActions";
import { connect, Matching } from "react-redux";
import { ArticleType } from "../store/reducer/articlesReducer";
import { ArticleLayoutTwo } from "./ArticleLayoutTwo";

type GetAllTasksType = () => void
type CreateNewArticleType = (title: string, isDone: boolean) => void
type DeleteArticleByIdType = (id: number) => void
type ArticlesType = ArticleType[] | null

type PropTypes = {
    articles: ArticlesType
    getAllTasks: GetAllTasksType
    createNewArticle: CreateNewArticleType
    deleteArticleById: DeleteArticleByIdType
}

const LastsPosts: 
    ComponentType<Matching<{ articles: ArticlesType; } & { getAllTasks: GetAllTasksType; createNewArticle: CreateNewArticleType; deleteArticleById: DeleteArticleByIdType; }, PropTypes>> = 
    ({ articles, getAllTasks, deleteArticleById }) => {

    // const [newTaskTitle, setNewTaskTitle] = useState('');
    // const [newTaskError, setNewTaskError] = useState<boolean>(false);
    // const [newTaskInputCls, setNewTaskInputCls] = useState([]);

    const getTasks = useCallback(() => {
        try {
            getAllTasks()
        } catch (err) {
            console.log(err)
        }
    }, [getAllTasks])

    useEffect(() => {
        if (!articles) {
            getTasks()
        }
        
    }, [getTasks, articles])

    // const onHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.target.value.trim())
    //     if (e.target.value.trim().length === 0) {
    //         setNewTaskError(true);
    //         setNewTaskInputCls(newTaskInputCls => [...newTaskInputCls, NewTaskInputClasses.errorMessage as unknown as CSSModuleClasses])
    //     } else {
    //         setNewTaskError(false)
    //         setNewTaskInputCls([NewTaskInputClasses])
    //     }
    // }
    
    // const addNewTask = () => {
    //     createNewArticle(newTaskTitle, false);
    //     setNewTaskTitle('');
    // }

    const removeArticle = (id: number) => {
        deleteArticleById(id)
    }

    const changeStatus = (id: number) => {
        console.log('changeStatus ' + id)
    }

    return <>
        <section className="w-full mt-32 px-32 flex flex-col items-center justify-center">
            <h2 className="w-full inline-block capitalize font-bold text-4xl">
                Posts
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-16">
                <article className="col-span-1 row-span-2 relative">
                    <ArticleLayoutOne 
                        key={23}
                        index={23} 
                        isChecked={true} 
                        title={'item.title'}
                        removeTask={removeArticle} 
                        changeStatus={changeStatus} />
                </article>
                <article className="col-span-1 row-span-1 relative">
                    <ArticleLayoutTwo 
                        key={25}
                        index={25} 
                        isChecked={true} 
                        title={'item.title'}
                        removeTask={removeArticle} 
                        changeStatus={changeStatus} />
                </article>
                <article className="col-span-1 row-span-1 relative">
                    <ArticleLayoutTwo 
                        key={65}
                        index={65} 
                        isChecked={true} 
                        title={'item.title'}
                        removeTask={removeArticle} 
                        changeStatus={changeStatus} />
                </article>
            </div>
        </section>
        {/* <div>
            <input type="text" onChange={onHandler} value={newTaskTitle} className={newTaskInputCls.join(' ')} /><button onClick={addNewTask}>+</button>
            <div className="errorMessage">{newTaskError && 'Value is required'}</div>
            <ul>
                {articles?.map((item) => {
                    return <ArticleLayoutOne 
                        key={item.id}
                        index={item.id} 
                        isChecked={item.isDone} 
                        title={item.title}
                        removeTask={removeArticle} 
                        changeStatus={changeStatus} />
                })}
            </ul>
        </div> */}
    </> 
}

const mapStateToProps = (state: AppStateType) => {
    return {
        articles: state.articlesReducer.articles
    }
}
  
const mapDispatchToProps =  {
    getAllTasks: () => getAllTasks(),
    createNewArticle: (title: string, isDone: boolean) => createNewArticle(title, isDone),
    deleteArticleById: (id: number) => deleteArticleById(id),
}

export default connect(mapStateToProps, mapDispatchToProps)(LastsPosts)