import {styled} from "@mui/material/styles";
import {alpha, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
       // backgroundColor: alpha(theme.palette.common.white, 0.25),
        border: '1px solid #dccdff',
    },
    margin: theme.spacing(1),

   // width: '100%',
    border: '1px solid #404040',
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1),
        flexBasis: '500px',
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),

        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
           // width: '20ch',
            width: '100%',
        },
    },
}));

export default function SearchInput() {
    return ( <Search>
        <SearchIconWrapper>
            <SearchIcon sx={{color:'#dccdff'}} />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
    </Search>)
}
