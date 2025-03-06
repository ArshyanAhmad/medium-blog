interface Blog {
    title: string
    content: string
    authorName: string
    publishedDate: string
}


export const BlogInfo = ({ title, content, authorName, publishedDate }: Blog) => {
    return (

        <div className="max-w-5xl pt-5 w-full m-auto  ">
            <div className="grid grid-cols-[2fr_1fr] p-2">
                <div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold text-gray-600">{title}</h1>
                        <h4 className="text-gray-500">Posted on {publishedDate}</h4>
                        <p className="text-gray-800 pt-6">
                            {content}

                        </p>
                    </div>
                </div>
                <div className="p-3  pl-6">
                    <div className="flex flex-col gap-5">

                        <div className="text-sm font-semibold text-slate-800">
                            <h4>Author</h4>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-xl text-slate-400">&#9673;</span>
                            <h3 className="text-lg font-semibold text-gray-800">{authorName}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}