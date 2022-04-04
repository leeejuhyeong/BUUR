import React, {useState, useRef} from 'react';
import axios from 'axios'
import MyPageBackHeader from '../../components/MyPage/MyPageBackHeader';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../../styles/userinfo.css'

const InfoPage = () => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        newPassword: '',
        showNewPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
      });

    // useEffect() 사용해서 바로 setImage
    // useEffect(() => {
        // const JWT = localStorage.getItem('jwt')
        // axios.get('https://j6b102.p.ssafy.io//api-v1/user/info', {
        //     headers: {
        //         'x-auth-token': JWT
        //     }
        // })
        // .then((res) => {
        //     console.log(res.data)
            
        // })
        // .catch((err)=> console.log(err))
    // },[]);

    const [image, setImage] = useState("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0bf59e89-f4fd-46b8-956d-b6ab3bfea09c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220403T113730Z&X-Amz-Expires=86400&X-Amz-Signature=ab9197b7eb7d5ea8ed16b038a9b03b106e125cf8f75b62e09fbe343f6059b026&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject")
    const [username, setUsername] = useState('김싸피')
    const [files, setFiles] = useState('');


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
        console.log(values)
    };

    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
        console.log(values)
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
        console.log(values)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const onLoadFile = (event) => {
        event.preventDefault();
        // const JWT = localStorage.getItem('jwt')
        const file = event.target.files[0];
        const reader = new FileReader();
        console.log(file);
        reader.onloadend = () => {
            setFiles(file);
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
        console.log(reader, file);

        // db에 저장
        const formdata = new FormData();
        formdata.append('uploadImg', files[0]);
        // content-type 필요할 경우 설정
        // axios.put('https://j6b102.p.ssafy.io/api-v1/user/profile', {
        //     'user_profile': formdata,
        //     headers: {
        //         'x-auth-token': JWT,
        //         'content-type': 'multipart/form-data'
        //     }
        // })
        // .then((res) => {
        //     console.log(res.data)
            
        // })
        // .catch((err)=> console.log(err))

    };

    const imageInput = useRef();

    const onClickAdd = () => {
        imageInput.current.click()
    }


    return (
        <div className='info-page'>
            <MyPageBackHeader
            pageInfo='내 정보 수정'
            />
            <div className='info-page-body'>
                <div className="info-img-div">
                    
                    <img src={image} alt="프로필 사진" className="profile-img"/>
                    {/* <img :src="`data:{Image}/png;base64,${comment.userProfilePhoto}`" alt="프로필 사진" className="profile-img"/> */}
                    {username}
                    <AddCircleIcon className="profile-change-btn" sx={{ color: '#E9B940'}} onClick={onClickAdd}/>
                    <input type="file" accpet="img/*" onChange={onLoadFile} style={{display:"none"}} ref={imageInput}/>
                </div>
                <div className="info-input-first-div">
                    <span>
                        이메일
                    </span>
                    <span>
                        {/* {} */}
                        ssafy@gmail.com
                    </span>
                </div>
                <div className='info-input-div'>
                    <span>
                        현재 비밀번호
                    </span>
                    <FormControl sx={{ m: 1, width: '190px'}} variant="outlined" >
                        <OutlinedInput
                            // id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            size="small"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                // aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className='info-input-div'>
                    <span>
                        신규 비밀번호
                    </span>
                    <FormControl sx={{ m: 1, width: '190px'}} variant="outlined" >
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showNewPassword ? 'text' : 'password'}
                            size="small"
                            value={values.newPassword}
                            onChange={handleChange('newPassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle newpassword visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownNewPassword}
                                edge="end"
                                >
                                {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className='info-input-div'>
                    <span>
                        비밀번호 확인
                    </span>
                    <FormControl sx={{ m: 1,  width: '190px'}} variant="outlined" >
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            size="small"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className='password-change-div'>
                    <Button  variant="contained" className="password-change-btn">변경하기</Button>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;