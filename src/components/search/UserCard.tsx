import { getUserType } from "@/dto/users";
import Link from "next/link";
import {Card, CardFooter, Avatar} from "@nextui-org/react";
import { Roles } from "@/utils/rolDefinition";

const UserCard=({user}:{'user':getUserType})=>{
    return <Link href={{pathname:`/profile/${user.id_user}`}} className='w-full'>
        <Card className="w-full">
            <div className="flex flex-col item-center items-center px-3 py-0 text-small text-default-400 w-full">
                <div className="w-[75%] px-10 pt-6 pb-4">
                    <Avatar
                        className="mr-0 w-full h-full"
                        alt="NextUI hero Image with delay"
                        src={user.profile_image?user.profile_image:'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'}
                        isBordered
                    />
                </div>
                <p className="flex flex-row pt-2 justify-center w-[90%] text-xl text-black font-bold">
                    {user.name+' '+user.lastname}
                </p>
                <p className="flex flex-wrap flex-row pt-2 justify-center w-[90%] text-default-500 gap-2">
                    {'@'+user.username} <p className="text-default-500"> {user.rol==Roles.lector?'Reader':'Writer'}</p>
                </p>
                <span className="flex flex-row pt-2 justify-start">
                {user.description}
                </span>
            </div>
            <CardFooter className="flex flex-wrap flex-row justify-between">
                <div className="flex flex-row gap-2">
                <p className="font-semibold text-default-400 text-small">{user.followersCount}</p>
                <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex flex-row gap-1">
                <p className="font-semibold text-default-400 text-small">{user.followingsCount}</p>
                <p className="text-default-400 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
        <div className="flex flex-col gap-2">
        </div>
    </Link>
}

export default UserCard;