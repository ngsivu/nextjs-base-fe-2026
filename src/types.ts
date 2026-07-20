/**
 * Toàn bộ type và zod schema của app nằm ở file này.
 *
 * Ví dụ:
 *
 * export type Product = {
 * 	id: string;
 * 	name: string;
 * 	price: string;
 * };
 *
 * export const productFormSchema = z.object({
 * 	name: z.string().min(1, 'Vui lòng nhập tên'),
 * 	price: z.string().min(1, 'Vui lòng nhập giá'),
 * });
 *
 * export type ProductFormValues = z.infer<typeof productFormSchema>;
 */

export {};
