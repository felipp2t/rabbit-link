import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Education {
  id: number;
  course: string;
  institution: string;
  year: string;
}

export default function UserProfileEdit() {
  const [avatar, setAvatar] = useState("/placeholder-user.jpg");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [educations, setEducations] = useState<Education[]>([]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { id: Date.now(), course: "", institution: "", year: "" },
    ]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string,
  ) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  return (
    <div className="container mx-auto mt-36 space-y-6">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Editar Perfil</CardTitle>
        </CardHeader>
      </Card>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                Alterar foto
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Número de Telefone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="phone">Número de Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Biografia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Conte-nos um pouco sobre você"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Formação Acadêmica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button type="button" onClick={addEducation} variant="outline">
            Adicionar Formação
          </Button>
          {educations.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`course-${edu.id}`}>Curso</Label>
                    <Input
                      id={`course-${edu.id}`}
                      value={edu.course}
                      onChange={(e) =>
                        updateEducation(edu.id, "course", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Instituição</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, "institution", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`year-${edu.id}`}>Ano</Label>
                    <Input
                      id={`year-${edu.id}`}
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(edu.id, "year", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeEducation(edu.id)}
                      className="w-full"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="mx-auto max-w-4xl pb-6">
        <Button type="submit" className="w-full">
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
