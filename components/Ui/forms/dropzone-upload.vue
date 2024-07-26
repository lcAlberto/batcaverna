<template>
  <div class="card">
    <Toast/>
    <FileUpload
      name="demo[]"
      @upload="onTemplatedUpload($event)"
      :multiple="props.multiple"
      :disabled="!props.multiple && files.length > 0"
      :accept="props.accept"
      :maxFileSize="1000000"
      @select="onSelectedFiles"
    >
      <template #header="{ chooseCallback, uploadCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="fa fa-folder-open"
              :disabled="!props.multiple && files.length > 0"
              rounded
              outlined
              severity="secondary"
            ></Button>
            <Button
              @click="uploadEvent(uploadCallback)"
              icon="fa fa-upload"
              rounded
              outlined
              severity="success"
              :disabled="!files || files.length === 0"
            ></Button>
            <Button
              v-if="false"
              @click="onClearTemplatingUpload(uploadCallback)"
              icon="fa fa-trash"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
          <ProgressBar
            :value="totalSizePercent"
            :show-value
            class="md:w-20rem h-1 w-full md:ml-auto"
          >
            <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
          </ProgressBar>
        </div>
      </template>
      <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
        <div class="flex flex-col gap-8 pt-4">
          <div v-if="files.length > 0">
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(file, index) of files"
                :key="file.name + file.type + file.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="file.objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge
                  value="Pending"
                  severity="warn"
                />
                <Button
                  icon="fa fa-trash"
                  @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(file, index) of uploadedFiles"
                :key="file.name + file.type + file.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="file.objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge
                  value="Completed"
                  class="mt-4"
                  severity="success"
                />
                <Button
                  icon="fa fa-trash"
                  @click="removeUploadedFileCallback(index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i class="fa fa-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"/>
          <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {usePrimeVue} from 'primevue/config';
import {useToast} from "primevue/usetoast";

const props = defineProps({
  multiple: {type: Boolean, default: false},
  accept: {type: String, default: 'image/*'},
})
const emits = defineEmits(['update'])

const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const removeUploadedFileCallback = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
  files.value = [];
};

const onSelectedFiles = (event) => {
  if (!props.multiple && files.value.length > 0) {
    return
  }
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  emits('update', files.value)
  callback();
};

const onTemplatedUpload = () => {
  toast.add({severity: "info", summary: "Success", detail: "File Uploaded", life: 3000});
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};
</script>
