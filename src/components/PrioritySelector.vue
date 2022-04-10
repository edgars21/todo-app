<template>
    <select :value="selectedValue ? selectedValue : modelValue" 
        @input="$emit('update:modelValue', $event.target.value)">
        <template v-for="(op,idx) in options" :key="idx">
            <option :value="op.value">{{ op.label }}</option>
        </template>
    </select>
</template>

<script>

export default {
    props: [
        "selected-value",
        "model-value",
    ],

    setup() {
        console.log();

        const options = [
            {
                label: "First",
                value: 1
            },
            {
                label: "Second",
                value: 2                
            },           
            {
                label: "Third",
                value: 3
            } 
        ]

        return {
            options
        }
    },
}
</script>
