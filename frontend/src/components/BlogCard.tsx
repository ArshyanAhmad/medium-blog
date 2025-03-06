import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    imageSrc: string;
    imageAltText: string
    id: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    imageSrc,
    imageAltText,
}: BlogCardProps) => {

    return (
        <Link to={`/blog/${id}`}>
            <div className="max-w-4xl  w-full m-auto cursor-pointer ">
                <div className="grid grid-cols-[2fr_1fr]  pb-5">

                    <div className="p-5  flex flex-col gap-2">
                        <div className="flex items-center gap-2 ">
                            <div>
                                <Avatar />
                            </div>
                            <div className="flex items-center gap-1">
                                <h4 className="text-gray-500">{authorName}</h4>
                                &middot;
                                <h5 className="text-sm text-gray-500 font-medium">
                                    {publishedDate}
                                </h5>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold">{title}</h2>
                        <p className="text-gray-700">
                            {content.length > 200 ? content.slice(0, 180) + "..." : content}
                        </p>
                        <div className="pt-4 text-right m-auto max-w-8/10 w-full  text-gray-500 text-sm font-medium">
                            {`${Math.ceil(content.length / 100)} min ago`}
                        </div>
                    </div>

                    <div className="flex items-center justify-center  h-full w-full rounded-2xl">
                        <img className="w-full h-full p-3  rounded-2xl object-cover" src={imageSrc} alt={imageAltText} />
                    </div>

                </div>

                <div className="border-b border-b-gray-400/20 "></div>
            </div>
        </Link>
    );
};

