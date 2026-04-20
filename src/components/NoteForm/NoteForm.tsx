import css from './NoteForm.module.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type {NoteFormValues} from '../../types/note'

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]).required(),
});

export default function NoteForm({ onClose }: { onClose: () => void }) {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"]});
      onClose();
    },
  });

  const formik = useFormik<NoteFormValues>({
    initialValues: {
      title: "",
      content: "",
      tag: "Todo",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
          <form className={css.form} onSubmit={formik.handleSubmit}>

            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" className={css.input} value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.title && formik.errors.title && (
                <span className={css.error}>{formik.errors.title}</span>
              )}
            </div>
            
            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <textarea id="content" name="content" className={css.textarea} value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            
            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <select id="tag" name="tag" className={css.select} value={formik.values.tag} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
            
            <div className={css.actions}>
              <button type="button" className={css.cancelButton} onClick={onClose}>Cancel</button>
            
              <button type="submit" className={css.submitButton} disabled={mutation.isPending}>Create note</button>
            </div>
          </form>
  );
}