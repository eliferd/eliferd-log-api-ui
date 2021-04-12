<template>
    <div v-bind:class="{errored: isValidationFailed}">
        <label v-bind:for="inputName">{{ inputLabel }}</label> <br v-if="!inline">
        <input v-bind:type="inputType"
            v-bind:class="{'full-width': isFullWidth}"
            v-bind:placeholder="inputPlaceholder"
            v-bind:name="inputName"
            v-bind:id="inputName"
            v-on:input="$emit('input', $event.target.value)"
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
    font-family: 'Montserrat', sans-serif;
    box-sizing:border-box;
}
input:focus {
    outline: none;
}
.full-width {
    width: 100%;
}
br+input {
    margin-top: 12px;
}

.errored {
    color: red;
    border-color: #ff4848;
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
    @Prop() isFullWidth!: boolean;
    @Prop() inputPlaceholder!: string;
    @Prop() inputName!: string;
    @Prop() inputLabel!: string;
    @Prop() inputValue!: string | number;
    @Prop() inline!: boolean;
    @Prop() isValidationFailed!: boolean;
    @Prop() onUserInput!: Function | undefined;
}
</script>
