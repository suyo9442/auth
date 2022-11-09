import { async } from '@firebase/util';
import React, {useState} from 'react'
import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    // onChange를 두개 만들지 않게 하기위해
    // input 속성의 name이 email(value)이면 ~~ email state를 변경
    const onChange = (event) => {
        // console.log(event.target.name)
        const {target: {name, value}} = event;

        if(name === 'email') {
            setEmail(value)
        } else if (name === "password") {
            setpassword(value)
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault(); // form을 submit 했을 때 새로고침 방지

        try {
            let data;
            if(newAccount) {
                // 회원가입하기
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // 로그인하기
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)
    const onSocialClick = async(event) => {
        console.log(event.target.name)
        const {target: {name}} = event;


        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder='Email' 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name='password' 
                    type="password" 
                    placeholder='Password' 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input 
                    type="submit" 
                    value={newAccount ? "회원가입하기" : "로그인하기"} 
                    required
                />
                <span>{error}</span>
                <span onClick={toggleAccount}>{newAccount ? "로그인하기" : "회원가입하기"}</span>
            </form>
            <div>
                <button name='google' onClick={onSocialClick}>Continue with Google</button>
                <button name='github' onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;

