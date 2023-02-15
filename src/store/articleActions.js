import apiArticle from "../api-service/apiArticle"


export const addArticle = async (article) => {
    const res = await apiArticle.post('/article' , article);
    return res.data
}

