<template>
    <div class="SingleTask" :class="{isDone: taskData.archived, isEditing: taskExpanded}">
        <div class="SingleTask__heading" @click="handleExpandTitle">
            <div @click="handleDoneTask" class="SingleTask__done"></div>
            <div class="SingleTask__title">{{ taskData.title }}</div>
            <div class="SingleTask__priority">
                <template v-if="taskData.priority">
                    <div class="SingleTask__priorityLabel">Priority:</div>
                    <PrioritySelector :selected-value="taskData.priority"></PrioritySelector>
                </template>
            </div>
        </div> 
        <template v-if="taskExpanded">
            <EditTask @addSubTask="$emit('addSubTask')" @closeEdit="taskExpanded = false" :task-data="taskData"></EditTask>
        </template>
    </div>
</template>

<script>
import { ref} from "vue";
import { useStore } from 'vuex';
import PrioritySelector from './PrioritySelector';
import EditTask from './EditTask';

export default {
    components: {
        PrioritySelector,
        EditTask,
    },

    props: ["task-data"],

    setup(props) {
        const store = useStore();
        const taskExpanded = ref(false);

        function handleExpandTitle() {
            if (taskExpanded.value === false) {
                taskExpanded.value = true;
            }
        }

        function handleDoneTask() {
            if (props.taskData.archived === true) {
                store.commit('unArchiveTask', props.taskData);
            } else {
                store.commit('archiveTask', props.taskData);
            }
        }

        return {
            taskExpanded,
            handleExpandTitle,
            handleDoneTask,
        }
    }
}
</script>

<style>
.SingleTask.isEditing .SingleTask__heading {
    display: none;
}

.SingleTask__heading {
    padding: 10px 10px;
}

.SingleTask__title {
    padding-right: 20px;
    flex-grow: 1;
}

.SingleTask__heading:hover {
    background-color: #fafafa;
    cursor: pointer;
}

.SingleTask__heading {
    display: flex;
}

.SingleTask__priority {
    position: relative;
    pointer-events: none;
}

.SingleTask__priorityLabel {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.SingleTask__done {
    width: 15px;
    height: 15px;
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.SingleTask__done:hover {
    border-color: #9FC088;
}

.SingleTask.isDone .SingleTask__done {
    background-color: #9FC088;
}

.SingleTask.isDone .SingleTask__done::after {
    content: "✓";
    display: block;
    color: #ffffff;
    font-size: 12px;
}

.SingleTask.isDone .SingleTask__title {
    text-decoration: line-through;
    opacity: 0.8;
}
</style>