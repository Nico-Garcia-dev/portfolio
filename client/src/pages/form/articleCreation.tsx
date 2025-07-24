import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import ImgUpload from "../../components/imgUpload/imgUpload";

import "./articleCreation.css";
import { useNavigate } from "react-router";

type ProjectForm = {
  title: string;
  github_url: string;
  description: string;
  image: File[];
  stack: string[];
};

type StackType = {
  id: number;
  name: string;
  image_url: string;
};

export default function ArticleCreation() {
  const [stack, setStack] = useState<StackType[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectForm & { image: File[] }>({
    defaultValues: {
      stack: [],
    },
  });

  useEffect(() => {
    fetchData("stack", setStack);
  }, []);

  const fetchData = async (route: string, setStack: (data: []) => void) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${route}`,
        {
          withCredentials: true,
        },
      );
      setStack(response.data);
      console.log(stack);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<ProjectForm> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("github_url", data.github_url);
    formData.append("stack", JSON.stringify(data.stack));
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/el-barto`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setTimeout(() => navigate("/"), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    register("image", { required: "Veuillez ajouter une image" });
  }, [register]);

  return (
    <>
      <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>
        <section className="first-block">
          <div className="drop-zone">
            <ImgUpload onFilesChange={(files) => setValue("image", files)} />
          </div>
          <div className="recipe-nameAndPersons">
            <article>
              <label htmlFor="title">Titre du projet</label>
              <input
                {...register("title", {
                  required: {
                    value: true,
                    message: "merci de completer ce champ",
                  },
                  minLength: {
                    value: 2,
                    message: "le champ doit contenir au minimum 2 caractères",
                  },
                  maxLength: {
                    value: 50,
                    message: "le champ doit contenir au maximum 50 caractères",
                  },
                })}
                name="title"
              />
              {errors?.title && <span>{errors.title.message}</span>}
            </article>
            <article>
              <label htmlFor="github_url">Github Url</label>
              <input
                {...register("github_url", {
                  required: {
                    value: true,
                    message: "merci de completer ce champ",
                  },
                  minLength: {
                    value: 2,
                    message: "le champ doit contenir au minimum 2 caractères",
                  },
                  maxLength: {
                    value: 255,
                    message: "le champ doit contenir au maximum 50 caractères",
                  },
                })}
                name="github_url"
              />
              {errors?.title && <span>{errors.title.message}</span>}
            </article>
          </div>
        </section>
        <section className="second-block">
          <article className="label_article">
            <h4>Stack</h4>
            <div className="selection">
              {stack.map((s) => (
                <div key={s.id}>
                  <input
                    type="checkbox"
                    id={`stack-${s.id}`}
                    {...register("stack")}
                    value={s.id}
                    className="checkbox-hidden"
                  />
                  <label className="selectstack" htmlFor={`stack-${s.id}`}>
                    {s.name}
                  </label>
                </div>
              ))}
            </div>
            {errors?.stack && <span>{errors.stack.message}</span>}
          </article>
        </section>
        <section className="third-block">
          <article className="steps-article">
            <h4>Description</h4>
            <textarea
              placeholder="Descritpion"
              {...register("description", {
                required: true,
              })}
            />

            {errors?.title && <span>{errors.title.message}</span>}
          </article>
        </section>
        <div className="submit-btn">
          <motion.button
            className="btn"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Envoyer
          </motion.button>
        </div>
      </form>
    </>
  );
}
