// import _ from 'lodash'
import React, { useCallback, useReducer } from 'react'
import { Search, Grid, SearchProps } from 'semantic-ui-react'

// interface ArticleType {
//     title: string
//     description: string
//     image: string
// }

// const source = Array.from({ length: 5 }, () => {return {
//     title: "Kurlyk",
//     description: "blabla",
//     image: "https://react.semantic-ui.com/logo.png"
// }}) 

type InitialStateType = {
    loading?: boolean
    results?: string[]
    value?: string
}
enum ActionTypeName {
    CLEAN_QUERY = "CLEAN_QUERY",
    START_SEARCH = "START_SEARCH",
    FINISH_SEARCH = "FINISH_SEARCH",
    UPDATE_SELECTION = "UPDATE_SELECTION"
}

interface ActionType {
    type: ActionTypeName
    query?: string
    results?: string[]
    selection?: string
}

const initialState: InitialStateType = {
    loading: false,
    results: [],
    value: '',
}

function exampleReducer(state: InitialStateType, action: ActionType) {
    switch (action.type) {
        case ActionTypeName.CLEAN_QUERY:
            return initialState
        case ActionTypeName.START_SEARCH:
            return { ...state, loading: true, value: action.query }
        case ActionTypeName.FINISH_SEARCH:
            return { ...state, loading: false, results: action.results }
        case ActionTypeName.UPDATE_SELECTION:
            return { ...state, value: action.selection }
        default:
            throw new Error()
    }
}

function SearchExampleStandard() {
    const [state, dispatch] = useReducer(exampleReducer, initialState)
    const { loading, results, value } = state

    const timeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined> = React.useRef()
    const handleSearchChange = useCallback((event: unknown, data: SearchProps) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: ActionTypeName.START_SEARCH, query: data?.value })

        timeoutRef.current = setTimeout(() => {
            if (data?.value?.length === 0) {
                dispatch({ type: ActionTypeName.CLEAN_QUERY })
                return
            }

            // const re = new RegExp(_.escapeRegExp(data?.value), 'i')
            // const isMatch = (result: ArticleType) => re.test(result.title)

            dispatch({
                type: ActionTypeName.FINISH_SEARCH,
                results: results,
            })
        }, 300)
    }, [])
    React.useEffect(() => {
        return () => {
        clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <Grid>
            {/* <GridColumn width={6}> */}
                <Search
                    loading={loading}
                    placeholder='Поиск...'
                    onResultSelect={(e, data) =>
                        dispatch({ type: ActionTypeName.UPDATE_SELECTION, selection: data.result.title })
                    }
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
            {/* </GridColumn> */}
        </Grid>
    )
}

export default SearchExampleStandard