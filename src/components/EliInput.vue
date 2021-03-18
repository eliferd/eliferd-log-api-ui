<template>
    <div>
        <label v-bind:for="inputName">{{ inputLabel }}</label> <br v-if="!inline">
        <input v-bind:type="inputType"
            v-bind:placeholder="inputPlaceholder"
            v-bind:name="inputName"
            v-bind:id="inputName"
            v-on:input="onUserInput"
            v-bind:value="inputValue">
    </div>
</template>

<style scoped>
input {
    padding: 8px;
    border-color: #E2E2E2;
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
}
input:focus {
    outline: none;
}
br+input {
    margin-top: 12px;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export enum EliInputTypeEnum {
    TEXT = 'text',
    NUMBER = 'number',
    PASSWORD = 'password'
}

@Component
export default class EliInput extends Vue {
    @Prop() inputType!: EliInputTypeEnum
    @Prop() inputPlaceholder!: string;
    @Prop() inputName!: string;
    @Prop() inputLabel!: string;
    @Prop() inputValue!: string | number;
    @Prop() inline!: boolean;
    @Prop() onUserInput!: Function | undefined;
}
</script>
