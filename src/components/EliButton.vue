<template>
    <input v-if="isSubmit" v-bind:form="form" type="submit" v-bind:value="label">
    <button v-else v-bind:disabled="disabled" v-on:click="clickEvent">{{ label }}</button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EliButton extends Vue {
    @Prop() label!: string;
    @Prop() disabled!: boolean;
    @Prop() isSubmit!: boolean;
    @Prop() form!: string;
    @Prop() clickEvent!: Function;
}
</script>
<style scoped>
button, input[type=submit] {
    background-color: #13B470;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 8px 24px;
    font-size: 24px;
    font-family: 'Montserrat', Helvetica, sans-serif;
    user-select: none;
}
button:hover, input[type=submit]:hover {
    cursor: pointer;
    background-color: #0FCD7D;
}
button:focus, input[type=submit]:focus {
    background-color: #1B9662;
    outline: none;
    box-shadow: 0 0 0 0.2rem #13b47159;
}
button:disabled, input[type=submit]:disabled {
    background-color: #13b47193;
    cursor: default;
}
</style>
