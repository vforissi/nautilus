<template>
    <div class="view">
        <div class="pres">
            <div class="logo">
                <img class="logoImg" alt="nautilus icon" src="@/assets/logo.jpg" @click="redirect('/home')"/>
                <h1 class="title">NAUTILUS</h1>
            </div>
            <h4>We analyse the psychology of your applicants.<br><br>Know better, Hire better.</h4>
        </div>
        <div class="forms">
            <Login/>
            <SignUp/>
        </div>
    </div>
</template>

<script>
import { SignUp, Login } from '@/components/gate';

export default {
    components: {
        SignUp, 
        Login
    },
}
</script>

<style scoped>
    .pres {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        height: 100%;
        width: 100%;
    }
    .logo {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 10px;
    }
    .title {
        border: 0px solid deepskyblue;
        background-color: white;
        color: deepskyblue;
        padding: 35px 20px 5px 0px;
    }
    .logoImg { 
        width:auto;
        max-height:100px;
    }
    h4 {
        flex: 4;
        width: 80%;
        margin: 100px;
        text-align: left;

    }
    .forms {
        flex: 1;
        height: 100%;
        width: 100%;
    }
    @media only screen and (min-width: 768px) {
    .view {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        height: 800px;
        width: 100%;
        background-color: #f7f7f7
    }
    h4 {
        width: 70%;
    }
}
</style>
