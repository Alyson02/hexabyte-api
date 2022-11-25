

export function getProductsMiddleware(req, res, next){
    const {id} = req.params;
    const page = parseInt(req.query.page);
    const tipo = req.query.categoria;
    if(id){
        res.locals.operacao = id;
        return;
    }
    if(!id && tipo ){
        res.locals.operacao = {page, tipo}
        return;
    }
    else{
        
    }

}