'use client'
import { Button, Link } from "@nextui-org/react";
import { deletePost, getPost } from "@/utils/fetchs";
import { Image } from "@nextui-org/react";
import RecommendedBar from "@/components/RecommendedBar";
import { useEffect, useState } from "react";
import { article_has_categories, returnArticlesCategory } from "@/dto/article";
import { decryptedJWT } from "@/dto/users";
import { getFromLocalStorage } from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import { saveArticle } from "@/utils/Articles/fetch";

export default function PostComponent({id}: any) {

    const [article,setArticle] = useState<returnArticlesCategory>()
    const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
    const [saved, setSaved] = useState<boolean>(false)

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken();
            setUserInfo(rol);
        }else{
            setUserInfo({userId:-1,rol:-1});
        }
    }

    useEffect(() => {
        (async () => {
            const article = await getPost(id)
            console.log(article)
            setArticle(article[0])
        })();
    }, [])

    useEffect(()=>{
        token()
    },[])



    return (<>
        {article? 
        <div className="flex flex-row gap-20 p-20 w-full h-full">
            <div className="flex flex-col gap-7 w-[75%] justify-start">
                <div className="flex flex-row gap-4">
                {article?.article_has_categories.length!==0?
                        article?.article_has_categories.map((item:article_has_categories, index) => (
                            <p key ={index} className="font-semibold text-xl text-zinc-700">{item.category.cat_name}</p>
                        ))

                    :
                        <>No hay Articulos socio</>
                }
                <div className="flex grow justify-end">
                    {userInfo.userId==article?.id_writer?
                    <Button size='sm' className="mb-2 bg-red-700 text-white" onClick={() => deletePost(id)}>
                    Borrar artículo
                    </Button>
                    :
                    <Button size='sm' className="mb-2 bg-red-700 text-white" onClick={() => saveArticle(id)}>
                    Guardar artículo
                    </Button>
                     }
                </div>
            </div>   
                <p className="font-bold text-3xl">{article?.title}</p>
                <p className="font-semibold text-xl text-zinc-700">Author: <Link href={`/perfil?search=${article?.id_writer}`}><p className="font-semibold text-xl text-zinc-700 underline">{article?.username}</p></Link></p>
                <p className="font-medium text-lg text-zinc-700">{article?.date.toString()}</p>
                <div className="flex flex-row w-full justify-center mb-5">
                        <Image
                        src={article?.image_url} 
                        className="w-[80em] h-[40em] object-cover rounded-lg"
                        >
                        </Image>
                </div>

                <div className="flex justify-center text-justify">
                    <div dangerouslySetInnerHTML={{ __html: article?.text ?? '' }}/>
                </div>
            </div>

            <RecommendedBar id={id}/>

        </div>
        :
        <p>No hay articulo rey</p>}
        </>

    );
}