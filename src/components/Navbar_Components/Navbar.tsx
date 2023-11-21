'use client';
import { useState,useEffect, useCallback, useRef} from 'react';
import '../../app/globals.css'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    user,
} from "@nextui-org/react";
import {getFromLocalStorage, removeFromLocalStorage} from '@/utils/localStorage';
import { Dropdown,DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react';
import Image from "next/image";
import verifyToken from '@/utils/utils'
import Link from 'next/link'
import { decryptedJWT } from '@/dto/users';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './SearchIcon';
import LoadingButton from './LoadingButton';
import { getCategories } from '@/utils/fetchs';
import { titleCase, label } from '@/utils/Navbar/utils';
import { usePathname } from 'next/navigation';
import { Roles } from '@/utils/rolDefinition';

export default function App(this: any) {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userInfo,setInfoUser] = useState<decryptedJWT>({userId:-2,rol:-2})
    const router = useRouter()
    const [serach, setSearch]=useState<string>('')
    const [selected, setSelected]=useState<string>('')
    const ref= useRef<any>()
    const [categories, setCategories] = useState<Array<any>>([{
        'id_category': 0,
        'cat_name': "",
    }]);

    // fetch de categorias
    useEffect(() => {
        async function fetchData() {
            const categoriesData = await getCategories();
            if(categoriesData){
                setCategories(categoriesData);
            }
        }
        fetchData();}, []);
    
    async function token(){
        const rol =await verifyToken();
        setInfoUser(rol);
    }
    
    useEffect(()=>{
        token();
    },[]);
    
    const logOut=()=>{
        const tok = getFromLocalStorage("token");
        if(tok){
            removeFromLocalStorage("token")
        }
        router.refresh()
        router.push("/")
        window.location.reload();
        token()
    }

    // token(); 

    const menuButtons = [
        {"rol":[-1,-2],"label":"Sign Up","ref":"/register"},
        {"rol":[-1,-2],"label":"Log In","ref":"/login"},
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Profile","ref":"/profile",'query':userInfo.userId},
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Log Out","ref":"/", "ev":logOut}      
    ]

    const menuItems = [
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Feed","ref":"/feed"},
        {"rol":[Roles.escritor, Roles.admin],"label":"New Article","ref":"/createArticle"},
        {"rol":[Roles.escritor, Roles.admin, Roles.lector],"label":"Communities","ref":"/communities"},
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Profile","ref":"/profile",'query':userInfo.userId},
        {"rol":[-1,-2],"label":"Sign Up","ref":"/register"},
        {"rol":[-1,-2],"label":"Log In","ref":"/login"},
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Log Out","ref":"/", "ev":logOut}   
    ];

    const menuSections = [
        {"rol":[Roles.escritor,Roles.lector,Roles.admin],"label":"Feed","ref":"/feed"},
        {"rol":[Roles.escritor, Roles.admin],"label":"New Article","ref":"/createArticle"},
        {"rol":[Roles.escritor, Roles.admin, Roles.lector],"label":"Communities","ref":"/communities"}
    ]

    // redireccion de articulos por categoria
    const redirectToCategory = (id: number) => {
        window.location.href = `/articles-by-category/${id}`;
    };

    const pathname = usePathname()
    if (pathname==='/login' || pathname==='/register'){
        return <></>
    }
    
    return (
        <Navbar id ="nav_conatiner" className="flex justify-between bg-[#0079DC] max-w-full w-full shadow-xl" onMenuOpenChange={setIsMenuOpen}>
            
            <NavbarContent id='logo' justify='start'>
                <NavbarBrand className='mr-8'>
                    <Link className='flex flex-row ' href={'/'}>
                    <Image
                        src="/images/logo.png"
                        alt="App Logo"
                        width={35}
                        height={35}
                    />
                    <p className="flex flex-col justify-center font-bold text-2xl text-white">TrUNews</p>
                    </Link>
                </NavbarBrand>

                {/* <NavbarItem mr-8>
                    <Input startContent={
                        <AiOutlineSearch size="1.5rem" />
                    } placeholder="Buscar artículos..." />
                </NavbarItem> */}
            </NavbarContent>

            <NavbarContent className="flex gap-4 w-[50%] sm:w-[35%] " justify="center">
            <Input
                classNames={{
                    base: "max-w-full h-10 mr-4",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-white ",
                }}
                placeholder="Type to search"
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                onChange={(event)=>{setSearch(event.target.value)}}
                onKeyDown={(event)=>{if(event.key=='Enter'){ref.current.click()}}}
            />
            <Link target='_parent' href={{pathname:'/search', query:{q:serach}}} ref={ref}/>
            </NavbarContent>
            {/* <NavbarContent className="hidden md:flex  gap-4 " justify="center"> */}
                {/* <Dropdown>
                    <NavbarItem isActive={userInfo.rol==-1?false:true}>
                        <DropdownTrigger>
                            <Link
                                className='text-white font-bold' href="#"                          >
                                Features
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[15rem]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="Noticias de deportes"
                        //startContent={icons.scale}
                        >
                            Deportes
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent> */}
            
            <NavbarContent className="hidden md:flex  gap-4" justify="center">
                <Dropdown>
                    <NavbarItem isActive={selected=='Categorias'? true:false}>
                        <DropdownTrigger>
                            <Link onClick={()=>setSelected('Categorias')}
                                className='text-white' href="#" aria-current="page"                            >
                                Categories
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                        aria-label="News Categories"
                        className="w-[15rem] dropdown-menu-scroll flex flex-col items-center"
                        itemClasses={{
                            base: "gap-4",
                        }}
                        onAction={(key) => redirectToCategory(parseInt(key.toString()) + 1)}>
                        {categories.map((category, index) => (
                            <DropdownItem key={index} description={`${label()} ${titleCase(category.cat_name)}`}>
                                {titleCase(category.cat_name)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                {menuSections.filter(item => item.rol.includes(userInfo.rol)).map((item, index) => (
                    <NavbarItem key={`${item.label}-${index}`} isActive={selected==item.label? true:false}>
                            <Link className='text-white' color="foreground" href={{pathname:item.ref}} onClick={()=>setSelected(item.label)}>
                                {item.label}
                            </Link>
                    </NavbarItem>
                ))}
                <NavbarItem>
                </NavbarItem>
            </NavbarContent>

            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            </NavbarContent> */}

            {/* <NavbarContent className="hidden sm:flex gap-4" justify='center'>

                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg font-bold"
                                //endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                Categorías
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-full"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="Noticias de deportes"
                        //startContent={icons.scale}
                        >
                            Deportes
                        </DropdownItem>
                        <DropdownItem
                            key="usage_metrics"
                            description="Noticias de economía"
                        //startContent={icons.activity}
                        >
                            Economía
                        </DropdownItem>
                        <DropdownItem
                            key="production_ready"
                            description="Noticias de realidad social"
                        //startContent={icons.flash}
                        >
                            Realidad social
                        </DropdownItem>
                        <DropdownItem
                            key="99_uptime"
                            description="Noticias de salud"
                        //startContent={icons.server}
                        >
                            Salud
                        </DropdownItem>
                        <DropdownItem
                            key="supreme_support"
                            description="Noticias de entretenimiento"
                        //startContent={icons.user}
                        >
                            Entretenimiento
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </NavbarContent> */}
            <NavbarContent className='hidden md:flex flex-row' justify='end'>
                {menuButtons.filter(item => item.rol.includes(userInfo.rol)).map((item, index) => (
                        <NavbarItem key={`${item.label}-${index}`}>
                            {userInfo.rol==-2?
                                <LoadingButton key={index} />
                            :
                                item.ev?
                                    <Button className='bg-white grow' variant="flat" onClick={item.ev}>
                                        {item.label}
                                    </Button>
                                :   
                                    item.query?
                                    <Link className='text-black' href={`${item.ref}/${userInfo.userId}`}>
                                        <Button className='bg-white grow' variant="flat" >
                                            {item.label}
                                        </Button>
                                    </Link>
                                    :
                                    <Link className='text-black' href={{pathname:item.ref}}>
                                        <Button className='bg-white grow' variant="flat" >
                                            {item.label}
                                        </Button>
                                    </Link>
                            }
                        </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className="flex md:hidden " justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>
             <NavbarMenu className='flex flex-col items-end gap-4'>
                <Dropdown placement='left-start'>
                    <NavbarItem isActive={selected=='Categorias'? true:false}>
                        <DropdownTrigger>
                            <Link className='w-full justify-end'  color={"foreground"} onClick={()=>setSelected('Categorias')} href="#">
                                <p>{'Categories'}</p>
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                        aria-label="News Categories"
                        className="w-[15rem] dropdown-menu-scroll flex flex-col items-center"
                        itemClasses={{
                            base: "gap-4",
                        }}
                        onAction={(key) => redirectToCategory(parseInt(key.toString()) + 1)}>
                        {categories.map((category, index) => (
                            <DropdownItem key={index} description={`${label()} ${titleCase(category.cat_name)}`}>
                                {titleCase(category.cat_name)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                {menuItems.filter(item => item.rol.includes(userInfo.rol)).map((item, index) => (
                <NavbarMenuItem key={`${index}`} className='p-4 text-2xl'>
                    {item.ev?
                        <Link  className="w-full justify-end" color='warning' href="#" onClick={item.ev}>
                            <p>{item.label}</p>
                        </Link>
                    :   
                        item.query?
                        <Link className='w-full justify-end'  color={"foreground"}  href={`${item.ref}/${userInfo.userId}`}>
                            <p>{item.label}</p>
                        </Link>
                        :
                        <Link className='w-full justify-end'  color={"foreground"}  href={{pathname:item.ref}}>
                            <p>{item.label}</p>
                        </Link>
                    }
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}