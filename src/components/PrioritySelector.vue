<template>
    <select>
        <template v-for="(op,idx) in options" :key="idx">
            <option v-if="selectedValue == op.value" selected="selected" :value="op.value">{{ op.label }}</option>
            <option v-else :value="op.value">{{ op.label }}</option>
        </template>
    </select>
</template>

<script>

export default {
    props: [
        "selected-value",
    ],

    setup() {
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
