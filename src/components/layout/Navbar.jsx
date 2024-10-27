import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {

    return (
        <div className='bg-white w-full flex flex-col items-center fixed z-[99]'>
            <div className='w-11/12 h-[100px] flex flex-col'>
                <div className='flex h-[36px] w-full justify-end items-center gap-4'>
                    <h6>Help</h6>
                    <h6>Orders & Returns</h6>
                    <h6>Hi,John</h6>
                </div>
                <div className='h-full w-full flex items-center justify-between'>
                    <h1 className='text-[32px] font-bold'>ECOMMERCE</h1>
                    <div className='md:flex hidden items-center gap-5'>
                        <h4 className='font-semibold'>Categories</h4>
                        <h4 className='font-semibold'>Sale</h4>
                        <h4 className='font-semibold'>Clearance</h4>
                        <h4 className='font-semibold'>New stock</h4>
                        <h4 className='font-semibold'>Trending</h4>
                    </div>
                    <div className='flex items-center gap-10'>
                        <SearchIcon className='text-4xl opacity-60' />
                        <ShoppingCartIcon className='text-4xl opacity-60' />
                    </div>
                </div>
            </div>
            <div className="h-[36px] bg-[#F4F4F4] flex justify-center items-center w-full text-[14px] font-medium">
                <KeyboardArrowLeftIcon />  Get 10% off on business sign up   <ChevronRightIcon />
            </div>
        </div>
    )
}

export default Navbar