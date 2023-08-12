import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import crypto from 'crypto'; // crypto 모듈 추가

const app = express();

// 64바이트의 랜덤한 문자열 생성
const secretKey = crypto.randomBytes(64).toString('hex');

// 세션 설정
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2.0 설정
passport.use(new GoogleStrategy({
    clientID: '165540769232-gl4405v52jpibcpj3s4t8b80m1esjekl.apps.googleusercontent.com', // Google API Console에서 발급받은 클라이언트 ID를 넣어줍니다.
    clientSecret: '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', // Google API Console에서 발급받은 클라이언트 시크릿을 넣어줍니다.
    callbackURL: 'http://127.0.0.1:5500/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // 인증 성공 시 처리
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// 로그인 시작
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// 콜백 핸들러
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/next_page.html'
}));
app.listen(5500, () => {
    console.log('Server is running on port 5500');
});